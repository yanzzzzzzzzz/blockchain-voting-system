export function convertBigIntTimestampToISO(
  timestamp: BigInt | number
): string {
  return new Date(Number(timestamp) * 1000).toISOString();
}
