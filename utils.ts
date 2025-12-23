export interface User {
  id: string;
  isPremium: boolean;
  yearsActive: number;
  tags: string[];
  referralCount?: number;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function logCalculation(userId: string, result: number): void {
  console.log(`[Billing System] User: ${userId} - Final: ${formatCurrency(result)}`);
}
