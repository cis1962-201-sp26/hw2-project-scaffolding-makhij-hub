import { validatePizza } from "../src/validatePizza.js";

test("valid pizza passes", () => {
  const result = validatePizza({ size: 12, crust: "normal" });

  expect(result.isPizza).toBe(true);
  if (result.isPizza) {
    expect(result.pizza.isDeepDish).toBe(false);
    expect(result.pizza.toppings).toEqual([]);
  }
});

test("valid pizza passes 2 (with toppings)", () => {
  const result = validatePizza({
    size: 10,
    crust: "stuffed",
    isDeepDish: true,
    toppings: ["cheese", "Bacon"],
  });

  expect(result.isPizza).toBe(true);
  if (result.isPizza) {
    expect(result.pizza.crust).toEqual("stuffed");
    expect(result.pizza.isDeepDish).toBe(true);
    expect(result.pizza.toppings).toEqual(["cheese", "Bacon"]);
  }
});

test("invalid pizza fails (missing size)", () => {
  const result = validatePizza({ crust: "normal" });

  expect(result.isPizza).toBe(false);
  if ("reasons" in result) {
    expect(result.reasons.length).toBeGreaterThan(0);
  }
});

test("invalid pizza fails (invalid curst)", () => {
  const result = validatePizza({ crust: "narmal" });

  expect(result.isPizza).toBe(false);
  if ("reasons" in result) {
    expect(result.reasons.length).toBeGreaterThan(0);
  }
});

test("invalid pizza fails (negatie number)", () => {
  const result = validatePizza({ size: -2, crust: "normal" });

  expect(result.isPizza).toBe(false);
  if ("reasons" in result) {
    expect(result.reasons.length).toBeGreaterThan(0);
  }
});

test("invalid pizza fails (forbidden topping)", () => {
  const result = validatePizza({
    size: 16,
    crust: "stuffed",
    toppings: ["cheese", "pineapple"],
  });

  expect(result.isPizza).toBe(false);
  if ("reasons" in result) {
    expect(result.reasons.join("\n")).toMatch(/Forbidden toppings/i);
  }
});

test("invalid pizza fails (forbidden topping caps)", () => {
  const result = validatePizza({
    size: 16,
    crust: "stuffed",
    toppings: ["cheese", "Pineapple"],
  });

  expect(result.isPizza).toBe(false);
  if ("reasons" in result) {
    expect(result.reasons.join("\n")).toMatch(/Forbidden toppings/i);
  }
});
