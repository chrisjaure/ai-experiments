export interface User {
  id: string;
  isPremium: boolean;
  yearsActive: number;
  referralCount: number;
  tags: string[];
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

  // Rule 3: Coupon logic (Increases complexity through branching)
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

  // Rule 4: Referral Tiers
  if (user.referralCount >= 11) {
    discount += 0.10;
  } else if (user.referralCount >= 6) {
    discount += 0.05;
  } else if (user.referralCount >= 1) {
    discount += 0.02;
  }

  // Final sanity check
  const finalDiscount = discount > 0.5 ? 0.5 : discount;
  let finalPrice = basePrice * (1 - finalDiscount);

  // Rule 5: Super-Referrer Bonus
  if (user.isPremium && user.referralCount > 20) {
    finalPrice -= 5.00;
  }

  return Math.max(0, finalPrice);
}
