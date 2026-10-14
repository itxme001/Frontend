"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/auth-modal";

export default function SignupPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/80 to-obsidian" />
        <div className="absolute inset-0 opacity-30">
          <img
            src="/photos/editorial/journal-1.webp"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <AuthModal open={open} onClose={() => router.push("/")} initialMode="signup" />
    </div>
  );
}
