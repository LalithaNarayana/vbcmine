import { OtpProvider, OtpSendResult } from "./otpProvider";

/**
 * Mock OTP provider — does NOT send a real SMS. Logs the OTP to the
 * server console and returns it in the API response (debugOtp) so the
 * flow is fully testable end-to-end before a real SMS gateway is wired in.
 *
 * Replace with a real provider (e.g. Msg91Provider) and flip
 * OTP_PROVIDER=msg91 in .env — no other code changes needed.
 */
export class MockOtpProvider implements OtpProvider {
  async sendOtp(mobile: string, otp: string): Promise<OtpSendResult> {
    console.log(`[MockOtpProvider] OTP for ${mobile}: ${otp}`);
    return { success: true, debugOtp: otp };
  }
}
