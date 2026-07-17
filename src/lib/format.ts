/**
 * Formats a monetary amount for display, always showing exactly 2 digits
 * after the decimal point (e.g. 1200 -> "1,200.00", 118.5 -> "118.50").
 * GST math only ever produces up to 2 decimal places, so this never
 * truncates real precision — it just makes sure amounts are shown
 * consistently instead of dropping trailing zeros.
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
