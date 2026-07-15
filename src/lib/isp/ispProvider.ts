/**
 * ISP / RADIUS billing system provider interface — implement against the
 * real third-party ISP API later. Swap via ISP_PROVIDER env var in
 * getIspProvider() below. No route/UI code needs to change.
 */
export interface IspStatusResult {
  accountId: string;
  status: "active" | "inactive";
}

export interface IspActionResult {
  accountId: string;
  status: "active" | "inactive";
  success: boolean;
}

export interface IspDataUsageResult {
  accountId: string;
  dataUsedGb: number;
  dataLimitGb: number;
  lastSynced: string; // ISO date
}

export interface IspProvider {
  getStatus(accountId: string): Promise<IspStatusResult>;
  activate(accountId: string): Promise<IspActionResult>;
  deactivate(accountId: string): Promise<IspActionResult>;
  getDataUsage(accountId: string): Promise<IspDataUsageResult>;
}
