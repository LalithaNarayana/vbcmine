import {
  PaymentProvider,
  CreateOrderInput,
  CreateOrderResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from "./paymentProvider";

/**
 * Mock Payment provider — simulates a payment gateway. createOrder()
 * generates a fake order id; verifyPayment() always succeeds instantly,
 * simulating a completed payment so the full checkout -> activation
 * flow can be tested end-to-end before a real gateway (Razorpay/PayU/
 * Cashfree) is wired in.
 *
 * Replace with a real provider and flip PAYMENT_PROVIDER=razorpay in
 * .env — no other code changes needed.
 */
export class MockPaymentProvider implements PaymentProvider {
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    const providerOrderId = `mock_order_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    console.log(
      `[MockPaymentProvider] Created order ${providerOrderId} for ₹${input.amount}`
    );
    return {
      providerOrderId,
      amount: input.amount,
      currency: "INR",
      meta: { mock: true },
    };
  }

  async verifyPayment(
    input: VerifyPaymentInput
  ): Promise<VerifyPaymentResult> {
    const providerPaymentId = `mock_pay_${Date.now()}`;
    console.log(
      `[MockPaymentProvider] Verified payment for order ${input.providerOrderId}`
    );
    return { success: true, providerPaymentId };
  }
}
