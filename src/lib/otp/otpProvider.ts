/**
 * OTP Provider interface — implement this against a real SMS gateway
 * (MSG91 / Twilio / Firebase / etc.) later. Swap via OTP_PROVIDER env var
 * in getOtpProvider() below. No UI or route code needs to change.
 */
export interface OtpSendResult {
  success: boolean;
  /** Only ever populated by the mock provider for local testing — a real
   *  provider must NOT return the OTP in the response. */
  debugOtp?: string;
}

export interface OtpProvider {
  /** Sends a 6-digit OTP to the given 10-digit mobile number. */
  sendOtp(mobile: string, otp: string): Promise<OtpSendResult>;
}
