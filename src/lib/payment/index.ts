import { PaymentProvider } from "./paymentProvider";
import { MockPaymentProvider } from "./mockPaymentProvider";

/**
 * Provider factory. Set PAYMENT_PROVIDER=razorpay (etc.) in .env once a
 * real gateway integration file exists — add the branch here.
 */
export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER || "mock";
  switch (provider) {
    case "mock":
    default:
      return new MockPaymentProvider();
  }
}

export * from "./paymentProvider";
