export function convertBigIntTimestampToISO(timestamp: BigInt | number): string {
  return new Date(Number(timestamp) * 1000).toISOString()
}
export function convertToUnixTimestamp(date: Date): number {
  return new Date(date).getTime() / 1000
}
