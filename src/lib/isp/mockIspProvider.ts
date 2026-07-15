import connectDB from "@/lib/mongodb";
import IspUsage from "@/models/IspUsage";
import {
  IspProvider,
  IspStatusResult,
  IspActionResult,
  IspDataUsageResult,
} from "./ispProvider";

/**
 * Mock ISP provider — simulates a third-party ISP/RADIUS billing API.
 * Persists status/usage per accountId in the IspUsage collection so
 * results are stable across calls (not random-every-time), and usage
 * ticks up slightly on each read to simulate real consumption.
 *
 * Replace with a real provider (calling the actual ISP API over HTTP)
 * and flip ISP_PROVIDER=<real> in .env — no other code changes needed.
 */
export class MockIspProvider implements IspProvider {
  private async getOrCreateRecord(accountId: string) {
    await connectDB();
    let record = await IspUsage.findOne({ accountId });
    if (!record) {
      record = await IspUsage.create({
        accountId,
        status: "active",
        dataUsedGb: Math.round(Math.random() * 50 * 10) / 10,
        dataLimitGb: 1000,
        lastSynced: new Date(),
      });
    }
    return record;
  }

  async getStatus(accountId: string): Promise<IspStatusResult> {
    const record = await this.getOrCreateRecord(accountId);
    return { accountId, status: record.status };
  }

  async activate(accountId: string): Promise<IspActionResult> {
    const record = await this.getOrCreateRecord(accountId);
    record.status = "active";
    await record.save();
    console.log(`[MockIspProvider] Activated ${accountId}`);
    return { accountId, status: record.status, success: true };
  }

  async deactivate(accountId: string): Promise<IspActionResult> {
    const record = await this.getOrCreateRecord(accountId);
    record.status = "inactive";
    await record.save();
    console.log(`[MockIspProvider] Deactivated ${accountId}`);
    return { accountId, status: record.status, success: true };
  }

  async getDataUsage(accountId: string): Promise<IspDataUsageResult> {
    const record = await this.getOrCreateRecord(accountId);
    // Simulate slight incremental usage on each fetch
    record.dataUsedGb = Math.min(
      record.dataLimitGb,
      Math.round((record.dataUsedGb + Math.random() * 0.5) * 10) / 10
    );
    record.lastSynced = new Date();
    await record.save();
    return {
      accountId,
      dataUsedGb: record.dataUsedGb,
      dataLimitGb: record.dataLimitGb,
      lastSynced: record.lastSynced.toISOString(),
    };
  }
}
