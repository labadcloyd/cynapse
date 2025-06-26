export function CalcDistribution(balance: number): number {
  return Math.round(balance * Math.random() * 1000) / 1000;
}
