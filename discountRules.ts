import type { User } from './logic';

export function couponDiscount(currentDiscount: number, user: User, couponCode?: string): number {
  let discount = currentDiscount;
  if (couponCode) {
    if (couponCode === 'SAVE20') {
      discount = Math.max(discount, 0.20);
    } else if (couponCode.startsWith('SUMMER')) {
      if (user.tags.includes('summer-early-access')) {
        discount += 0.15;
      } else {
        discount += 0.05;
      }
    }
  }
  return discount;
}

export function referralDiscount(user: User): number {
  const count = user.referralCount ?? 0;
  if (count >= 1 && count <= 5) return 0.02;
  if (count >= 6 && count <= 10) return 0.05;
  if (count >= 11) return 0.10;
  return 0;
}

export function applySuperReferrerBonus(user: User, priceAfterPercent: number): number {
  const count = user.referralCount ?? 0;
  if (count > 20 && user.isPremium) {
    return Math.max(0, priceAfterPercent - 5.0);
  }
  return priceAfterPercent;
}
