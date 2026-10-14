import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <ShoppingBag className="mx-auto h-16 w-16 text-gold-ink" aria-hidden />
      <h1 className="mt-5 font-serif text-4xl text-obsidian">Checkout Cancelled</h1>
      <p className="mt-3 text-slate-500">
        No payment was taken and your bag is still saved. Ready when you are.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild variant="primary" className="w-full sm:w-auto">
          <Link href="/cart">
            Return to Bag
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/shop">
            Keep Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
