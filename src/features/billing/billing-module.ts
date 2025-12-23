import { getUserData } from "../../shared/user/api.ts";
import { calculateFinalPrice } from "./billing-logic.ts";

export async function printCurrentUserBillingInfo() {
  // In a real application, you would get the current user ID from the session or authentication context
  const currentUserId = "1";
  const user = await getUserData(currentUserId);
  console.log({
    userId: currentUserId,
    billingCycle: "monthly",
    amountDue: calculateFinalPrice(29.99, user),
  });
}
