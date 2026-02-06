#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { validatePizza } from "./validatePizza.js";

async function main() {
  const { positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
  });

  const file = positionals[0];

  if (!file) {
    console.error("Usage: pizza_validation <pizza.json>");
    process.exitCode = 1;
    return;
  }

  try {
    const rawFile = await readFile(file, "utf-8");
    const data: unknown = JSON.parse(rawFile);

    const result = validatePizza(data);

    if (result.isPizza) {
      console.log("You have a valid pizza!");
      console.log(result.pizza);
    } else {
      console.log("This is not a valid pizza.");
      for (const r of result.reasons) console.log(`- ${r}`);
      process.exitCode = 1;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Could not read/parse file: ${msg}`);
    process.exitCode = 1;
  }
}

main();
