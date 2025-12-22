import { couponDiscount, referralDiscount, applySuperReferrerBonus } from './discountRules';

export interface User {
  id: string;
  isPremium: boolean;
  yearsActive: number;
  tags: string[];
  referralCount?: number;
}

export function calculateFinalPrice(basePrice: number, user: User, couponCode?: string): number {
  let discount = 0;

  // Rule 1: Premium Status
  if (user.isPremium) {
    discount += 0.10;

    // Nested Rule: Loyalty bonus for premium
    if (user.yearsActive > 5) {
      discount += 0.05;
    } else if (user.yearsActive > 2) {
      discount += 0.02;
    }
  } else {
    // Rule 2: Non-premium seasonal tag check
    if (user.tags.includes('seasonal-invite')) {
      discount += 0.05;
    }
  }

  // Delegate Coupon logic and Referral tiers to external rules
  discount = couponDiscount(discount, user, couponCode);
  discount += referralDiscount(user);

  // Final sanity check for percentage discounts
  const finalDiscount = discount > 0.5 ? 0.5 : discount;
  let priceAfterPercent = basePrice * (1 - finalDiscount);

  // Apply Super-Referrer flat bonus after percentage discounts
  priceAfterPercent = applySuperReferrerBonus(user, priceAfterPercent);

  return priceAfterPercent < 0 ? 0 : priceAfterPercent;
}
