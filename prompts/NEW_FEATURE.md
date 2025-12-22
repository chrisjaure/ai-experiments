MISSION: Add a 'Multi-Tier Referral Discount' to calculateFinalPrice in logic.ts.

FEATURE REQUIREMENTS:

1. Referral Tiers: The user object now includes a referralCount property.

2. Logic: > - 1-5 referrals: +2% discount.

    - 6-10 referrals: +5% discount.

    - 11+ referrals: +10% discount.

3. The 'Super-Referrer' Bonus: If a user has > 20 referrals AND is a isPremium member, they get an additional flat $5.00 off the final price after all other percentage discounts are applied.
