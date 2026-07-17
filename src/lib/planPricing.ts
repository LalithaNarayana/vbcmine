/** Picks the lowest-priced (typically monthly) price entry off a plan. */
export function cheapestPrice(prices: { duration: unknown; price: number }[]): number {
  if (!prices || prices.length === 0) return 0;
  return [...prices].sort((a, b) => a.price - b.price)[0].price;
}

/**
 * Rounds a monetary amount to exactly 2 decimal places (paise-level
 * precision) rather than to the nearest whole rupee. Using a tiny epsilon
 * guards against floating point artifacts like 18.104999999999997.
 */
export function roundToTwoDecimals(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/** Computes GST for a base amount, keeping 2 decimal places of precision. */
export function calculateGst(baseAmount: number, gstPercent: number): number {
  return roundToTwoDecimals((baseAmount * gstPercent) / 100);
}

