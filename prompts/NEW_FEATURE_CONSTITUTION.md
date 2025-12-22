MISSION: Add a 'Multi-Tier Referral Discount' to calculateFinalPrice in logic.ts.

FEATURE REQUIREMENTS:

1. Referral Tiers: The user object now includes a referralCount property.

2. Logic: > - 1-5 referrals: +2% discount.

    - 6-10 referrals: +5% discount.

    - 11+ referrals: +10% discount.

3. The 'Super-Referrer' Bonus: If a user has > 20 referrals AND is a isPremium member, they get an additional flat $5.00 off the final price after all other percentage discounts are applied.

ENVIRONMENTAL DATA:

Read nervous_system.json. Note that logic.ts is currently at 22 complexity.

Constraint: This new referral logic is estimated to cost +6 complexity points.

Threshold: If (Current 22 + Proposed 6) > max_complexity (25), a Slow-Burn Trigger is activated.

CONSTITUTIONAL MANDATE: You are forbidden from adding this code directly to logic.ts because it violates the complexity threshold. You must instead perform Cell Division (Mitosis):

Identify the most complex logical block in logic.ts (e.g., the existing coupon or premium logic) and extract it to a new file.

Scaffold a new file called discountRules.ts to house both the extracted logic and the new Referral Tier logic.

Refactor logic.ts to be a "Lean Orchestrator" that calls these external rules.

Update nervous_system.json: Reduce logic.ts complexity to ~12 and register the new discountRules.ts file.
