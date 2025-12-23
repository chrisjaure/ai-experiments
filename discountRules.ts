import type { User } from './utils.ts';

export function calculatePremiumDiscount(user: User): number {
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
  return discount;
}

export function calculateReferralDiscount(user: User): number {
  const referralCount = user.referralCount || 0;
  
  if (referralCount > 10) {
    return 0.10;
  } else if (referralCount > 5) {
    return 0.05;
  } else if (referralCount >= 1) {
    return 0.02;
  }
  return 0;
}

export function applyCoupon(currentDiscount: number, user: User, couponCode?: string): number {
  if (!couponCode) return currentDiscount;

  let newDiscount = currentDiscount;

  if (couponCode === 'SAVE20') {
    newDiscount = Math.max(newDiscount, 0.20);
  } else if (couponCode.startsWith('SUMMER')) {
    if (user.tags.includes('summer-early-access')) {
      newDiscount += 0.15;
    } else {
      newDiscount += 0.05;
    }
  }
  
  return newDiscount;
}

export function calculateSuperReferralBonus(user: User): number {
  const referralCount = user.referralCount || 0;
  if (referralCount > 20 && user.isPremium) {
    return 5.00;
  }
  return 0;
}
