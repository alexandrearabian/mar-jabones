// Stripe payment service abstraction
// Handles payment intent creation, confirmation, and webhook processing

import Stripe from "stripe";
import { PaymentStatus } from "@/types/payments";

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return stripeClient;
}

export interface CreatePaymentIntentParams {
  amount: number; // in cents
  currency?: string;
  orderId: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResult {
  clientSecret: string;
  paymentIntentId: string;
}

export class StripeService {
  /**
   * Create a payment intent for an order
   */
  static async createPaymentIntent(
    params: CreatePaymentIntentParams
  ): Promise<PaymentIntentResult> {
    try {
      const paymentIntent = await getStripe().paymentIntents.create({
        amount: params.amount,
        currency: params.currency || "usd",
        metadata: {
          orderId: params.orderId,
          ...params.metadata,
        },
        receipt_email: params.customerEmail,
        // Enable Apple Pay and Google Pay
        payment_method_types: ["card"],
      });

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error("Stripe payment intent creation failed:", error);
      throw new Error("Failed to create payment intent");
    }
  }

  /**
   * Verify webhook signature and process event
   */
  static async verifyWebhook(
    payload: string | Buffer,
    signature: string
  ): Promise<Stripe.Event> {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    }

    try {
      return getStripe().webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Stripe webhook verification failed:", error);
      throw new Error("Invalid webhook signature");
    }
  }

  /**
   * Map Stripe payment status to our PaymentStatus enum
   */
  static mapPaymentStatus(
    stripeStatus: string
  ): PaymentStatus {
    switch (stripeStatus) {
      case "succeeded":
        return PaymentStatus.COMPLETED;
      case "processing":
        return PaymentStatus.PROCESSING;
      case "requires_payment_method":
      case "requires_confirmation":
      case "requires_action":
        return PaymentStatus.PENDING;
      case "canceled":
        return PaymentStatus.CANCELLED;
      default:
        return PaymentStatus.FAILED;
    }
  }

  /**
   * Retrieve payment intent details
   */
  static async getPaymentIntent(
    paymentIntentId: string
  ): Promise<Stripe.PaymentIntent> {
    return getStripe().paymentIntents.retrieve(paymentIntentId);
  }
}

