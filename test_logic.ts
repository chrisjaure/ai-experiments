import { calculateFinalPrice } from './logic.ts';
import type { User } from './logic.ts';

const baseUser: User = {
  id: 'test',
  isPremium: false,
  yearsActive: 1,
  referralCount: 0,
  tags: []
};

function assert(condition: boolean, msg: string) {
    if (!condition) {
        console.error(`FAILED: ${msg}`);
        process.exit(1);
    } else {
        console.log(`PASSED: ${msg}`);
    }
}

// Test 1: No referrals
const p1 = calculateFinalPrice(100, { ...baseUser, referralCount: 0 });
// Expected: 0 discount -> 100
assert(Math.abs(p1 - 100) < 0.01, `No referrals should have 0 referral discount. Got ${p1}`);

// Test 2: Tier 1 (3 referrals) -> 2%
const p2 = calculateFinalPrice(100, { ...baseUser, referralCount: 3 });
// Expected: 2% discount -> 98
assert(Math.abs(p2 - 98) < 0.01, `3 referrals should have 2% discount. Got ${p2}`);

// Test 3: Tier 2 (8 referrals) -> 5%
const p3 = calculateFinalPrice(100, { ...baseUser, referralCount: 8 });
// Expected: 5% discount -> 95
assert(Math.abs(p3 - 95) < 0.01, `8 referrals should have 5% discount. Got ${p3}`);

// Test 4: Tier 3 (15 referrals) -> 10%
const p4 = calculateFinalPrice(100, { ...baseUser, referralCount: 15 });
// Expected: 10% discount -> 90
assert(Math.abs(p4 - 90) < 0.01, `15 referrals should have 10% discount. Got ${p4}`);

// Test 5: Super Referrer (25 referrals, Premium)
// Base discount: Premium (10%) + Referral > 11 (10%) = 20%
// Price before flat: 100 * (1 - 0.20) = 80
// Final Price: 80 - 5 = 75
const p5 = calculateFinalPrice(100, { ...baseUser, referralCount: 25, isPremium: true });
assert(Math.abs(p5 - 75) < 0.01, `Super referrer (premium) should have extra $5 off. Got ${p5}`);

// Test 6: Super Referrer (25 referrals, Non-Premium)
// Base discount: Referral > 11 (10%) = 10%
// Price: 100 * 0.9 = 90
// No flat discount.
const p6 = calculateFinalPrice(100, { ...baseUser, referralCount: 25, isPremium: false });
assert(Math.abs(p6 - 90) < 0.01, `Super referrer (non-premium) should NOT have extra $5 off. Got ${p6}`);

console.log('All tests finished.');
