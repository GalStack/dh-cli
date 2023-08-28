import { Command } from "commander";
import { generateTailwindShades, isValidHexColor } from "./lib/tailwind/shades";
import chalk from "chalk";
import boxen from "boxen";

const program = new Command();

program
  .name("dev-helper")
  .description("CLI for developers to make their life easier")
  .version("0.1.0");

program
  .command("tailwind:shades")
  .description("Generate tailwind shades")
  .argument("<color>", "color to generate shades from in hex format")
  .action((str) => {
    if (!isValidHexColor(str)) {
      console.log(str);
      console.error(
        chalk.red(
          boxen("Invalid hex color", { padding: 1, title: "Tailwind Shades" })
        )
      );
      return;
    }

    console.info(
      boxen(generateTailwindShades(str), {
        padding: 1,
        title: "Tailwind Shades",
      })
    );
  });

program.parse();
