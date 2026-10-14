"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = React.useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    toast({
      title: "Message sent",
      description: `Thanks ${form.name.split(" ")[0] || "there"}, our team will reply within 24 hours.`,
      variant: "success",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <form onSubmit={onSubmit} className="rounded-none border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Full name
          </label>
          <Input id="contact-name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email address
          </label>
          <Input id="contact-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="contact-subject" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Subject
        </label>
        <Input id="contact-subject" required value={form.subject} onChange={(e) => update("subject", e.target.value)} />
      </div>
      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="block w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-obsidian shadow-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>
      <Button type="submit" variant="primary" className="mt-5 w-full" disabled={sending}>
        {sending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
