import { describe, expect, it } from "vitest";
import { formatCurrency } from "./billing-utils.ts";

describe("formatCurrency", () => {
  it("should format numbers to USD currency", () => {
    expect(formatCurrency(100)).toBe("$100.00");
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
    expect(formatCurrency(0)).toBe("$0.00");
  });
});
