#!/usr/bin/env node

import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";
import { loadConfig } from "../lib/config.js";
import { walkDirectory } from "../lib/scanner.js";
import { writeOutput } from "../lib/writer.js";

const program = new Command();

program
  .option("-p, --path <path>", "path to scan")
  .option("-o, --output <filename>", "output filename")
  .option("--ignore-folders <folders>", "comma-separated folders to ignore")
  .option(
    "--ignore-extensions <extensions>",
    "comma-separated extensions to ignore"
  )
  .option("--exclude-files <files>", "comma-separated filenames to exclude")
  .option(
    "--dry-run",
    "show files that would be included without writing output"
  );

program.parse(process.argv);
const cliOptions = program.opts();
const config = loadConfig(cliOptions);

console.log(
  chalk.gray(
    "Always ignoring: .git, .vscode, node_modules, .env, package-lock.json"
  )
);

const spinner = ora("Scanning files...").start();

try {
  const files = walkDirectory(config.path, config);
  spinner.succeed(`${files.length} files found.`);

  if (config.dryRun) {
    console.log(
      chalk.yellowBright("\n[DRY RUN] The following files would be included:\n")
    );
    files.forEach((file, index) => {
      console.log(chalk.cyan(`${index + 1}. /${file.relativePath}`));
    });
    console.log(chalk.greenBright(`\nTotal files: ${files.length}\n`));
  } else {
    const writeSpinner = ora("Writing output file...").start();
    writeOutput(files, config.output);
    writeSpinner.succeed(
      chalk.greenBright(`Done! Output written to: ${config.output} 🎯`)
    );
  }
} catch (err) {
  spinner.fail("Something went wrong.");
  console.error(err);
}
