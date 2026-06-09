// Payment provider abstraction layer
// Allows switching between Stripe and MercadoPago seamlessly

import { PaymentProvider, PaymentStatus } from "@/types/payments";
import { StripeService } from "./stripe";
import { MercadoPagoService } from "./mercadopago";

export interface PaymentService {
  createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult>;
  verifyWebhook(payload: unknown, signature: string): Promise<WebhookEvent>;
  mapPaymentStatus(status: string): PaymentStatus;
}

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  orderId: string;
  customerEmail: string;
  items?: Array<{
    title: string;
    quantity: number;
    unit_price: number;
  }>;
  metadata?: Record<string, string>;
}

export interface CreatePaymentResult {
  paymentId: string;
  clientSecret?: string; // For Stripe
  redirectUrl?: string; // For MercadoPago
}

export interface WebhookEvent {
  id: string;
  type: string;
  paymentId: string;
  status: PaymentStatus;
  metadata?: Record<string, unknown>;
}

export class PaymentServiceFactory {
  static getService(provider: PaymentProvider): PaymentService {
    switch (provider) {
      case PaymentProvider.STRIPE:
        return new StripePaymentService();
      case PaymentProvider.MERCADOPAGO:
        return new MercadoPagoPaymentService();
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }
}

class StripePaymentService implements PaymentService {
  async createPayment(
    params: CreatePaymentParams
  ): Promise<CreatePaymentResult> {
    const result = await StripeService.createPaymentIntent({
      amount: Math.round(params.amount * 100), // Convert to cents
      currency: params.currency || "usd",
      orderId: params.orderId,
      customerEmail: params.customerEmail,
      metadata: params.metadata,
    });

    return {
      paymentId: result.paymentIntentId,
      clientSecret: result.clientSecret,
    };
  }

  async verifyWebhook(
    payload: unknown,
    signature: string
  ): Promise<WebhookEvent> {
    const event = await StripeService.verifyWebhook(
      payload as string | Buffer,
      signature
    );

    let paymentId = "";
    let status: PaymentStatus = PaymentStatus.PENDING;

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as { id: string; status: string };
      paymentId = paymentIntent.id;
      status = StripeService.mapPaymentStatus(paymentIntent.status);
    }

    return {
      id: event.id,
      type: event.type,
      paymentId,
      status,
      metadata: event.data.object as unknown as Record<string, unknown>,
    };
  }

  mapPaymentStatus(status: string): PaymentStatus {
    return StripeService.mapPaymentStatus(status);
  }
}

class MercadoPagoPaymentService implements PaymentService {
  async createPayment(
    params: CreatePaymentParams
  ): Promise<CreatePaymentResult> {
    if (!params.items) {
      throw new Error("MercadoPago requires items array");
    }

    const result = await MercadoPagoService.createPreference({
      amount: params.amount,
      orderId: params.orderId,
      customerEmail: params.customerEmail,
      items: params.items,
      backUrls: {
        success: `${process.env.NEXTAUTH_URL}/checkout/success`,
        failure: `${process.env.NEXTAUTH_URL}/checkout/failure`,
        pending: `${process.env.NEXTAUTH_URL}/checkout/pending`,
      },
    });

    return {
      paymentId: result.preferenceId,
      redirectUrl: result.initPoint,
    };
  }

  async verifyWebhook(
    payload: unknown,
    signature: string
  ): Promise<WebhookEvent> {
    const notification = await MercadoPagoService.verifyWebhook(
      payload,
      signature as unknown as Record<string, string>
    );

    // TODO: Fetch payment details to get status
    return {
      id: notification.id,
      type: notification.type,
      paymentId: notification.id,
      status: PaymentStatus.PENDING,
    };
  }

  mapPaymentStatus(status: string): PaymentStatus {
    return MercadoPagoService.mapPaymentStatus(status);
  }
}

