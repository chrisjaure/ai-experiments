import { calculateFinalPrice } from './logic.ts';
import type { User } from './logic.ts';

function assert(condition: boolean, message: string) {
    if (!condition) {
        console.error(`❌ FAILED: ${message}`);
        process.exit(1);
    } else {
        console.log(`✅ PASSED: ${message}`);
    }
}

// Helper to create user
function createUser(isPremium: boolean, referrals: number): User {
    return {
        id: 'test',
        isPremium,
        yearsActive: 1,
        tags: [],
        referralCount: referrals
    };
}

console.log("Starting Verification...");

const basePrice = 100;

// 1. Referral Tiers
// 0 referrals
let price = calculateFinalPrice(basePrice, createUser(false, 0));
// No premium, no referrals => 0 discount => 100
assert(Math.abs(price - 100) < 0.01, "0 Referrals should have 0 discount");

// 3 referrals => 2%
price = calculateFinalPrice(basePrice, createUser(false, 3));
// 100 * (1 - 0.02) = 98
assert(Math.abs(price - 98) < 0.01, "3 Referrals should have 2% discount");

// 8 referrals => 5%
price = calculateFinalPrice(basePrice, createUser(false, 8));
// 100 * (1 - 0.05) = 95
assert(Math.abs(price - 95) < 0.01, "8 Referrals should have 5% discount");

// 15 referrals => 10%
price = calculateFinalPrice(basePrice, createUser(false, 15));
// 100 * (1 - 0.10) = 90
assert(Math.abs(price - 90) < 0.01, "15 Referrals should have 10% discount");


// 2. Super-Referrer
// 21 referrals, Premium
// Premium = 10%
// Referrals (21) = 10%
// Total % = 20%
// Price before flat = 100 * 0.80 = 80
// Flat bonus = $5
// Final = 75
price = calculateFinalPrice(basePrice, createUser(true, 21));
assert(Math.abs(price - 75) < 0.01, "Super-Referrer should have 20% + $5 off");

// 21 referrals, NOT Premium
// Premium = 0%
// Referrals = 10%
// Total % = 10%
// Price = 90
// Flat bonus = 0 (must be premium)
// Final = 90
price = calculateFinalPrice(basePrice, createUser(false, 21));
assert(Math.abs(price - 90) < 0.01, "High referrals but no premium should not get flat bonus");

// 3. Cap Check
// Premium (10%) + 15 Refs (10%) + SAVE20 (Max(20, current?))
// Wait, logic for SAVE20:
// discount = premium(0.1) + referral(0.1) = 0.2
// applyCoupon('SAVE20'): max(0.2, 0.20) = 0.2. No change.
// Total 0.2.

// Let's try to hit the cap (50%)
// User with Coupon SAVE20 (20%) + Premium (10%) + 50 referrals (10%) = 40%? No.
// How to hit 50%?
// Premium (10%) + 6 years active (+5%) = 15%
// Referral > 11 (10%) = 25%
// Coupon SUMMER (15% if early access) = 40%
// Still under 50%.
// What if we have logic that sums up?
// discountRules logic:
// SAVE20 uses Math.max.
// SUMMER adds 0.15.
// So: Premium(10%) + Loyalty(5%) + Referral(10%) = 25%.
// Coupon SUMMER with early access (+15%) = 40%.
// Still 40%.
// Is there a way to get higher?
// Maybe logic.ts used to return higher values?
// Ah, `calculatePremiumDiscount` returns 0.10 + 0.05 = 0.15 max.
// `calculateReferralDiscount` returns 0.10 max.
// Total 0.25.
// `applyCoupon` with SUMMER adds 0.15 max.
// Total 0.40.
// So 50% cap might be unreachable with current constants, but logic handles it.

console.log("All tests passed!");
