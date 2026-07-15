/**
 * Payment Provider interface — implement against a real gateway
 * (Razorpay / PayU / Cashfree) later. Swap via PAYMENT_PROVIDER env var
 * in getPaymentProvider() below. No route/UI code needs to change.
 */
export interface CreateOrderInput {
  amount: number; // total amount in INR (including GST), rupees not paise
  receipt: string; // internal reference (our Payment doc id)
}

export interface CreateOrderResult {
  providerOrderId: string;
  amount: number;
  currency: string;
  /** Extra data the client-side checkout widget needs (key id, etc.) */
  meta?: Record<string, unknown>;
}

export interface VerifyPaymentInput {
  providerOrderId: string;
  providerPaymentId?: string;
  signature?: string;
}

export interface VerifyPaymentResult {
  success: boolean;
  providerPaymentId: string;
}

export interface PaymentProvider {
  createOrder(input: CreateOrderInput): Promise<CreateOrderResult>;
  verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult>;
}
