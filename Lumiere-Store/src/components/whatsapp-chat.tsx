"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "923057168742"; // international format, no +

const QUICK_REPLIES = [
  "Hi! I have a question about an order",
  "Do you ship internationally?",
  "I need help with sizing",
  "What is your return policy?",
];

/**
 * Floating WhatsApp chat widget.
 * Opens a small panel with quick replies + a "Continue on WhatsApp" button
 * that opens wa.me with a pre-filled message.
 */
export function WhatsAppChat() {
  const [open, setOpen] = React.useState(false);
  const [customMessage, setCustomMessage] = React.useState("");
  const [showHint, setShowHint] = React.useState(false);

  React.useEffect(() => {
    // Show a subtle hint after 3 seconds on first visit
    const timer = setTimeout(() => {
      if (!localStorage.getItem("lumiere:wa-hint-seen")) {
        setShowHint(true);
        localStorage.setItem("lumiere:wa-hint-seen", "1");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  function openWhatsApp(message: string) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
    setCustomMessage("");
  }

  function handleCustomSend() {
    if (!customMessage.trim()) return;
    openWhatsApp(customMessage.trim());
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/30 sm:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-label="WhatsApp chat"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="fixed bottom-24 right-4 z-[75] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-5 w-5 text-white" aria-hidden />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Lumière Support</p>
                  <p className="text-xs text-white/70">Typically replies within an hour</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              {/* Messages area */}
              <div className="flex flex-col gap-2 bg-[#ECE5DD] px-4 py-4">
                <div className="max-w-[85%] rounded-lg rounded-tl-none bg-white px-3.5 py-2.5 text-sm text-obsidian shadow-sm">
                  <p>Hello! Welcome to Lumière. How can we help you today?</p>
                  <p className="mt-1 text-[10px] text-slate-400">Online now</p>
                </div>

                {/* Quick replies */}
                <div className="mt-2 flex flex-col gap-1.5">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => openWhatsApp(reply)}
                      className="rounded-lg rounded-tl-none bg-white px-3.5 py-2 text-left text-xs text-obsidian shadow-sm transition-colors hover:bg-shell"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom message input */}
              <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-3">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCustomSend()}
                  placeholder="Type a message…"
                  aria-label="Type a message"
                  className="h-10 flex-1 rounded-full border border-border bg-shell px-4 text-sm text-obsidian outline-none placeholder:text-slate-400 focus:border-gold"
                />
                <button
                  type="button"
                  onClick={handleCustomSend}
                  aria-label="Send on WhatsApp"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating button with hint */}
      <div className="fixed bottom-6 right-4 z-[76] sm:right-6">
        {/* Hint bubble */}
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
                aria-label="Dismiss"
                className="absolute right-1.5 top-1.5 text-slate-400 hover:text-obsidian"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
              <p className="text-xs font-medium text-obsidian">Need help?</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Chat with us on WhatsApp</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.5)]"
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

          {/* Online dot */}
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
