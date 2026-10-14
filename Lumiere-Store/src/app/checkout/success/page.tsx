import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface SuccessPageProps {
  searchParams: Promise<{ order_id?: string | string[] }>;
}

async function SuccessContent({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderId = typeof params.order_id === "string" ? params.order_id : "LUMIÈRE";
  return <OrderConfirmation orderId={orderId} />;
}

export default function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
          <div className="skeleton mx-auto h-64 rounded-none" />
        </div>
      }
    >
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
