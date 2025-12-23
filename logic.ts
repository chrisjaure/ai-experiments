import type { User } from './utils.ts';
import { 
  calculatePremiumDiscount, 
  calculateReferralDiscount, 
  applyCoupon, 
  calculateSuperReferralBonus 
} from './discountRules.ts';

export type { User } from './utils.ts';

export function calculateFinalPrice(basePrice: number, user: User, couponCode?: string): number {
  let discount = 0;

  // Rule 1: Premium Status & Seasonal
  discount += calculatePremiumDiscount(user);

  // Rule 2: Referral Tiers
  discount += calculateReferralDiscount(user);

  // Rule 3: Coupon logic
  discount = applyCoupon(discount, user, couponCode);

  // Final sanity check (Cap at 50%)
  const finalPercentDiscount = discount > 0.5 ? 0.5 : discount;
  
  // Calculate price after percentage discounts
  let finalPrice = basePrice * (1 - finalPercentDiscount);

  // Rule 4: Super-Referrer Bonus (Flat amount)
  const flatBonus = calculateSuperReferralBonus(user);
  finalPrice -= flatBonus;

  return Math.max(0, finalPrice);
}
