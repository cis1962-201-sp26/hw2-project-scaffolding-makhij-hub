import { z } from "zod";

const forbiddenToppings = ["pineapple", "mango", "kelp"];

//create model for valid pizza
export const CorrectPizza = z.object({
  //must have daimeter (positive number)
  size: z.number().positive(),
  //crust must be stuffed or normal
  crust: z.enum(["stuffed", "normal"]),
  //optional boolean
  isDeepDish: z.boolean().optional().default(false),
  //array of toppings. refine to get rid of forbidden toppings
  toppings: z
    .array(z.string())
    .optional()
    .default([])
    .refine(
      (toppingList) =>
        toppingList.every((t) => {
          const lowerTopping = t.toLowerCase().trim();
          return !forbiddenToppings.includes(lowerTopping);
        }),
      {
        message: `Contains at least one of the forbidden toppings: ${forbiddenToppings.join(", ")}`,
      },
    ),
});

export type Pizza = z.infer<typeof CorrectPizza>;

export type ValidPizza = {
  isPizza: true;
  pizza: Pizza;
};

export type InvalidPizza = {
  isPizza: false;
  reasons: string[];
};

export type ValidationMessage = ValidPizza | InvalidPizza;

export function validatePizza(testPizza: unknown): ValidationMessage {
  const result = CorrectPizza.safeParse(testPizza);

  if (result.success) {
    return { isPizza: true, pizza: result.data };
  }

  return {
    isPizza: false,
    reasons: result.error.issues.map((x) => x.message),
  };
}
