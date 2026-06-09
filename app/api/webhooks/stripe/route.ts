// Stripe webhook handler
// Processes payment events from Stripe

import { NextRequest, NextResponse } from "next/server";
import { StripeService } from "@/services/payments/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  try {
    const event = await StripeService.verifyWebhook(body, signature);

    // Handle payment intent events
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as {
        id: string;
        metadata: { orderId?: string };
      };

      // Prisma removed: persist payment/order updates via Strapi (or your API) here.
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as {
        id: string;
        metadata: { orderId?: string };
      };
      // Prisma removed: persist payment failures via Strapi (or your API) here.
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}

