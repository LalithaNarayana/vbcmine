import { OtpProvider } from "./otpProvider";
import { MockOtpProvider } from "./mockOtpProvider";

/**
 * Provider factory. Set OTP_PROVIDER=msg91 (etc.) in .env once a real
 * SMS gateway integration file exists — add the branch here.
 */
export function getOtpProvider(): OtpProvider {
  const provider = process.env.OTP_PROVIDER || "mock";
  switch (provider) {
    case "mock":
    default:
      return new MockOtpProvider();
  }
}

export * from "./otpProvider";
