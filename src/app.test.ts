import { afterAll, describe, expect, it, vi } from "vitest";

describe("should mock console.log", () => {
  const consoleMock = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);

  afterAll(() => {
    consoleMock.mockReset();
  });

  it("should log `sample output`", async () => {
    await import("./app.ts");
    expect(consoleMock).toHaveBeenLastCalledWith({
      userId: "1",
      billingCycle: "monthly",
      amountDue: 26.391199999999998,
    });
  });
});
