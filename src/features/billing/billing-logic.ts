import type { User } from "../../shared/user/api.ts";

function calculatePremiumStatusDiscount(user: User): number {
  if (user.isPremium) {
    if (user.yearsActive > 5) {
      return 0.15; // 0.1 + 0.05
    }
    if (user.yearsActive > 2) {
      return 0.12; // 0.1 + 0.02
    }
    return 0.1;
  }

  if (user.tags.includes("seasonal-invite")) {
    return 0.05;
  }

  return 0;
}

function calculateCouponDiscount(
  currentDiscount: number,
  user: User,
  couponCode?: string,
): number {
  if (!couponCode) return currentDiscount;

  if (couponCode === "SAVE20") {
    return Math.max(currentDiscount, 0.2);
  }

  if (couponCode.startsWith("SUMMER")) {
    const extra = user.tags.includes("summer-early-access") ? 0.15 : 0.05;
    return currentDiscount + extra;
  }

  return currentDiscount;
}

function calculateReferralDiscount(user: User): number {
  if (user.referralCount >= 11) return 0.1;
  if (user.referralCount >= 6) return 0.05;
  if (user.referralCount >= 1) return 0.02;
  return 0;
}

/**
 * @package
 */
export function calculateFinalPrice(
  basePrice: number,
  user: User,
  couponCode?: string,
): number {
  let discount = calculatePremiumStatusDiscount(user);

  discount = calculateCouponDiscount(discount, user, couponCode);

  discount += calculateReferralDiscount(user);

  // Final sanity check
  const finalDiscount = discount > 0.5 ? 0.5 : discount;
  let finalPrice = basePrice * (1 - finalDiscount);

  // Super-Referrer Bonus
  if (user.referralCount > 20 && user.isPremium) {
    finalPrice -= 5.0;
  }

  return Math.max(0, finalPrice);
}
