"use client";

import * as React from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[640px] px-4 text-center sm:px-6">
        <p className="label-xs text-gold">You&apos;re in</p>
        <h2 className="mt-4 font-serif text-3xl text-silk sm:text-4xl">Welcome to the house.</h2>
        <p className="mt-4 leading-relaxed text-silk/55">
          Watch your inbox for early access and artisan stories.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[640px] px-4 text-center sm:px-6">
      <p className="label-xs text-gold">Stay in the loop</p>
      <h2 className="mt-4 font-serif text-3xl text-silk sm:text-4xl">
        Join the inner circle
      </h2>
      <p className="mt-4 leading-relaxed text-silk/55">
        Early access to new drops, artisan stories, and occasional notes from the house.
        No spam — just the things worth knowing.
      </p>
      <form className="mt-8 flex gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          aria-label="Email address"
          suppressHydrationWarning
          className="flex-1 border border-white/15 bg-transparent px-4 py-3 text-sm text-silk placeholder:text-silk/30 outline-none focus:border-gold"
          required
        />
        <button
          type="submit"
          className="shrink-0 border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-obsidian transition-colors hover:bg-gold-light"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
