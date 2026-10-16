"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  Gift,
  MessageCircle,
  PackageSearch,
  RotateCcw,
  Ruler,
  Send,
  Sparkles,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

/** International format, no leading `+` — required by wa.me. */
const WHATSAPP_NUMBER = "923057168742";
const SUPPORT_HOURS = "Mon–Sat, 10:00–19:00 PKT";

// ─────────────────────────────────────────────────────────────────────────────
// Knowledge base — the assistant answers these instantly, without a human.
// Copy is kept in sync with the FAQ on /contact and the checkout constants.
// ─────────────────────────────────────────────────────────────────────────────

interface Topic {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Short chip text. */
  chip: string;
  /** Keywords used to match free-typed questions. */
  keywords: string[];
  answer: string;
}

const TOPICS: Topic[] = [
  {
    id: "shipping",
    label: "Shipping & delivery",
    icon: Truck,
    chip: "Shipping",
    keywords: ["ship", "shipping", "delivery", "deliver", "dispatch", "how long", "arrive", "courier", "express", "standard"],
    answer:
      "Orders are dispatched within 48 hours. Express delivery arrives in 1–3 business days and standard delivery in 3–7. Express shipping is free on orders over $300 — below that it is a flat $15.",
  },
  {
    id: "international",
    label: "International shipping",
    icon: Truck,
    chip: "International",
    keywords: ["international", "worldwide", "abroad", "country", "countries", "overseas", "duties", "customs", "usa", "uk", "dubai", "uae"],
    answer:
      "Yes — we ship to 40 countries. Duties and taxes are calculated at checkout where applicable, so there are no surprises when your parcel arrives.",
  },
  {
    id: "returns",
    label: "Returns & exchanges",
    icon: RotateCcw,
    chip: "Returns",
    keywords: ["return", "returns", "refund", "exchange", "send back", "wrong size", "change my mind", "cancelled", "canceled"],
    answer:
      "You have 30 days from delivery to return or exchange anything unworn in its original packaging. Fragrance must be unopened for hygiene reasons. Returns are free within Pakistan.",
  },
  {
    id: "sizing",
    label: "Sizing & fit",
    icon: Ruler,
    chip: "Sizing",
    keywords: ["size", "sizing", "fit", "fits", "measurement", "measure", "small", "large", "tight", "loose", "xl", "guide"],
    answer:
      "Our pieces run true to size with a relaxed fit, and every product page lists exact measurements. Tell us the piece and your usual size and we will confirm the best fit for you.",
  },
  {
    id: "payment",
    label: "Payment methods",
    icon: CreditCard,
    chip: "Payments",
    keywords: ["pay", "payment", "payments", "card", "visa", "mastercard", "cod", "cash", "bank", "transfer", "credit", "debit", "stripe"],
    answer:
      "You can pay with Cash on Delivery or Bank Transfer at checkout — both are live now. Card payments (Visa / Mastercard) are being added next. Checkout is protected with 256-bit encryption.",
  },
  {
    id: "track",
    label: "Track my order",
    icon: PackageSearch,
    chip: "Track order",
    keywords: ["track", "tracking", "where is my order", "status", "order number", "ordered", "dispatched", "parcel", "shipment"],
    answer:
      "Sign in and open My Account → Orders for live status and tracking. Would you rather we check it for you? Send your order number here and a human will look it up.",
  },
  {
    id: "change",
    label: "Change or cancel an order",
    icon: PackageSearch,
    chip: "Change order",
    keywords: ["change", "cancel", "amend", "edit order", "wrong address", "update address", "remove item"],
    answer:
      "Yes — as long as the order has not been dispatched. Message us with your order number as soon as possible and we will amend or cancel it free of charge.",
  },
  {
    id: "care",
    label: "Product care",
    icon: Sparkles,
    chip: "Care",
    keywords: ["care", "wash", "washing", "clean", "cleaning", "repair", "repairs", "wear out", "look after", "maintenance"],
    answer:
      "Every product page carries specific care notes. In general: cold gentle wash, air dry, and store knitwear folded. Repairs are free for the first two years.",
  },
  {
    id: "gift",
    label: "Gifting & packaging",
    icon: Gift,
    chip: "Gifting",
    keywords: ["gift", "gifting", "present", "packaging", "packaging", "wrap", "note", "card", "birthday"],
    answer:
      "Every order ships in plastic-free packaging and can include a handwritten note — add your message at checkout and we will write it by hand.",
  },
  {
    id: "contact",
    label: "Talk to a human",
    icon: UserRound,
    chip: "Talk to a human",
    keywords: ["human", "agent", "person", "someone", "speak", "talk", "call", "contact", "support", "help me", "complaint", "urgent"],
    answer:
      "Of course — you are one tap away from a real person. Tap “Continue on WhatsApp” below and your conversation here will be carried across, so you never have to repeat yourself.",
  },
];

const GREETING =
  "Hello, and welcome to Lumière. I can answer shipping, sizing, returns and payment questions right away — pick a topic below or type your question.";

const FALLBACK =
  "I want to make sure you get an accurate answer rather than a guess. Tap “Continue on WhatsApp” and a real person will reply — usually within one business day.";

/** Pick the topic whose keywords score highest in the visitor's text. */
function matchTopic(text: string): Topic | null {
  const haystack = text.toLowerCase();
  let best: { topic: Topic; score: number } | null = null;

  for (const topic of TOPICS) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (haystack.includes(keyword)) score += keyword.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }
  return best?.topic ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  /** When true the row renders a "Continue on WhatsApp" hand-off button. */
  action?: boolean;
}

export function WhatsAppChat() {
  const [open, setOpen] = React.useState(false);
  const [customMessage, setCustomMessage] = React.useState("");
  const [showHint, setShowHint] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(() => [
    { id: 1, from: "bot", text: GREETING },
  ]);

  const panelRef = useFocusTrap<HTMLDivElement>(open);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<number | null>(null);
  const nextId = React.useRef(2);

  // ── Lifecycle ──
  React.useEffect(() => {
    let hintTimer: number | undefined;
    try {
      hintTimer = window.setTimeout(() => {
        if (!localStorage.getItem("lumiere:wa-hint-seen")) {
          setShowHint(true);
          localStorage.setItem("lumiere:wa-hint-seen", "1");
        }
      }, 3000);
    } catch {
      // Private mode / storage disabled — simply skip the hint.
    }
    return () => window.clearTimeout(hintTimer);
  }, []);

  React.useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  // Escape closes the panel; background scroll is locked while it is open.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Clear any pending "typing" reveal if the widget unmounts.
  React.useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

  // Keep the transcript pinned to the newest message.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  // ── Conversation ──
  const push = React.useCallback((message: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: nextId.current++ }]);
  }, []);

  /**
   * Types, then reveals the answer. When `withCta` is set a "Continue on
   * WhatsApp" hand-off row follows once the answer has been read.
   * Everything runs through one timer ref so a reply can never fire twice
   * or land after the panel was reset.
   */
  const botReply = React.useCallback(
    (text: string, withCta = false) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setTyping(true);

      // Reading-speed delay, so the reply feels considered rather than canned.
      const revealIn = Math.min(600 + text.length * 6, 1500);
      timerRef.current = window.setTimeout(() => {
        setTyping(false);
        push({ from: "bot", text });
        if (!withCta) return;

        timerRef.current = window.setTimeout(() => {
          setTyping(true);
          timerRef.current = window.setTimeout(() => {
            setTyping(false);
            push({ from: "bot", text: "", action: true });
          }, 420);
        }, 500);
      }, revealIn);
    },
    [push]
  );

  function askTopic(topic: Topic) {
    if (typing) return;
    push({ from: "user", text: topic.label });
    botReply(topic.answer, true);
  }

  function handleCustomSend() {
    const text = customMessage.trim();
    if (!text || typing) return;
    push({ from: "user", text });
    setCustomMessage("");
    const topic = matchTopic(text);
    botReply(topic ? topic.answer : FALLBACK, true);
  }

  /** Hand the whole transcript to WhatsApp so nothing has to be retyped. */
  function continueOnWhatsApp() {
    const transcript = messages
      .filter((m) => !m.action)
      .map((m) => `${m.from === "bot" ? "Lumière" : "Me"}: ${m.text}`)
      .join("\n");
    const intro = `Hello Lumière — I was chatting with your assistant on the website.\n\n${transcript}\n\nCould someone take this from here?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(intro)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[44] bg-black/30 sm:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Lumière support chat"
              tabIndex={-1}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="fixed bottom-24 right-4 z-[45] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">Lumière Support</p>
                  <p className="truncate text-xs text-white/80">
                    Instant answers · human follow-up
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              {/* Transcript */}
              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-relevant="additions text"
                aria-label="Conversation"
                className="max-h-[46vh] min-h-[13rem] flex-1 overflow-y-auto overscroll-contain bg-[#ECE5DD] px-4 py-4"
              >
                <div className="flex flex-col gap-2">
                  {messages.map((message) =>
                    message.action ? (
                      <button
                        key={message.id}
                        type="button"
                        onClick={continueOnWhatsApp}
                        className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-[#075E54] px-3.5 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-[#054d44] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54]/50"
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
                        </svg>
                        Continue on WhatsApp
                      </button>
                    ) : (
                      <div
                        key={message.id}
                        className={
                          message.from === "user"
                            ? "max-w-[88%] self-end rounded-lg rounded-tr-none bg-[#DCF8C6] px-3.5 py-2.5 text-sm text-obsidian shadow-sm"
                            : "max-w-[88%] self-start rounded-lg rounded-tl-none bg-white px-3.5 py-2.5 text-sm text-obsidian shadow-sm"
                        }
                      >
                        {message.text}
                      </div>
                    )
                  )}

                  {typing && (
                    <div
                      className="flex w-16 items-center gap-1 self-start rounded-lg rounded-tl-none bg-white px-3.5 py-3 shadow-sm"
                      aria-label="Assistant is typing"
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
                          aria-hidden
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Topic chips */}
              <div className="border-t border-border bg-shell px-3 py-2.5">
                <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => askTopic(topic)}
                        disabled={typing}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:border-gold hover:text-gold-ink disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {topic.chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input + escalation */}
              <div className="border-t border-border bg-card px-3 py-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCustomSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <label htmlFor="wa-chat-input" className="sr-only">
                    Type a message
                  </label>
                  <input
                    id="wa-chat-input"
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Type a message…"
                    autoComplete="off"
                    className="h-10 flex-1 rounded-full border border-border bg-shell px-4 text-sm text-obsidian outline-none placeholder:text-slate-400 focus:border-gold"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!customMessage.trim() || typing}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-[10px] leading-tight text-slate-400">
                    Replies {SUPPORT_HOURS}
                  </p>
                  <button
                    type="button"
                    onClick={continueOnWhatsApp}
                    className="shrink-0 text-[11px] font-medium text-[#075E54] underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54]/40"
                  >
                    Continue on WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Floating button + hint ── */}
      <div className="fixed bottom-6 right-4 z-[46] sm:right-6">
        <AnimatePresence>
          {showHint && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-56 rounded-xl border border-border bg-card p-3 shadow-lg"
            >
              <button
                type="button"
                onClick={() => setShowHint(false)}
                aria-label="Dismiss hint"
                className="absolute right-1.5 top-1.5 rounded p-0.5 text-slate-400 hover:text-obsidian focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
              <p className="text-xs font-medium text-obsidian">Need help?</p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Instant answers, or chat with us on WhatsApp
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close support chat" : "Open support chat"}
          aria-expanded={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-6 w-6" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-6 w-6" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>

          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
