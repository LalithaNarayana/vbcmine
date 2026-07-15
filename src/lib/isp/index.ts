import { IspProvider } from "./ispProvider";
import { MockIspProvider } from "./mockIspProvider";

/**
 * Provider factory. Set ISP_PROVIDER=<real> in .env once a real
 * ISP/RADIUS API integration file exists — add the branch here.
 */
export function getIspProvider(): IspProvider {
  const provider = process.env.ISP_PROVIDER || "mock";
  switch (provider) {
    case "mock":
    default:
      return new MockIspProvider();
  }
}

export * from "./ispProvider";
