#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";

// Default config values
const DEFAULT_CONFIG = {
  path: process.cwd(),
  output: "prompt-context.txt",
  ignoreFolders: ".git,.vscode,node_modules",
  ignoreExtensions: "bat,log,tmp",
  excludeFiles: "package-lock.json,.env",
  dryRun: false,
};

// Load config file if exists
function loadConfigFile(basePath) {
  const configPath = path.join(basePath, ".generatecontextrc.json");
  if (fs.existsSync(configPath)) {
    try {
      const rawData = fs.readFileSync(configPath, "utf8");
      const parsed = JSON.parse(rawData);
      return parsed;
    } catch (err) {
      console.error(chalk.red("⚠ Error parsing config file!"));
      console.error(err);
      process.exit(1);
    }
  }
  return {};
}

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

const basePath = path.resolve(cliOptions.path || DEFAULT_CONFIG.path);

// Merge config: Default < Config file < CLI args
const fileConfig = loadConfigFile(basePath);

const finalOptions = {
  path: basePath,
  output: cliOptions.output || fileConfig.output || DEFAULT_CONFIG.output,
  ignoreFolders:
    cliOptions.ignoreFolders ||
    fileConfig.ignoreFolders ||
    DEFAULT_CONFIG.ignoreFolders,
  ignoreExtensions:
    cliOptions.ignoreExtensions ||
    fileConfig.ignoreExtensions ||
    DEFAULT_CONFIG.ignoreExtensions,
  excludeFiles:
    cliOptions.excludeFiles ||
    fileConfig.excludeFiles ||
    DEFAULT_CONFIG.excludeFiles,
  dryRun: cliOptions.dryRun ?? fileConfig.dryRun ?? DEFAULT_CONFIG.dryRun,
};

const outputFile = path.join(basePath, finalOptions.output);
const ignoreFolders = finalOptions.ignoreFolders
  .split(",")
  .map((s) => s.trim());
const ignoreExtensions = finalOptions.ignoreExtensions
  .split(",")
  .map((s) => s.trim().toLowerCase());
const excludeFiles = finalOptions.excludeFiles
  ? finalOptions.excludeFiles.split(",").map((s) => s.trim().toLowerCase())
  : [];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of list) {
    const filePath = path.join(dir, file.name);
    const relativePath = path.relative(basePath, filePath);

    if (file.isDirectory()) {
      if (ignoreFolders.some((folder) => relativePath.includes(folder)))
        continue;
      results = results.concat(walk(filePath));
    } else {
      const ext = path.extname(file.name).toLowerCase().replace(".", "");
      const fileNameLower = file.name.toLowerCase();

      if (ignoreExtensions.includes(ext)) continue;
      if (excludeFiles.includes(fileNameLower)) continue;

      results.push({ fullPath: filePath, relativePath });
    }
  }
  return results;
}

function writeOutput(files) {
  const stream = fs.createWriteStream(outputFile, { encoding: "utf8" });

  for (const file of files) {
    stream.write(`FILE: /${file.relativePath}\n`);
    stream.write(`BEGIN FILE CONTENT\n`);
    const content = fs.readFileSync(file.fullPath, "utf8");
    stream.write(content + "\n");
    stream.write(`END FILE CONTENT\n\n`);
    stream.write(`---\n`);
  }
  stream.end();
}

// Start spinner
const spinner = ora("Scanning files...").start();

try {
  const files = walk(basePath);
  spinner.succeed(`${files.length} files found.`);

  if (finalOptions.dryRun) {
    console.log(
      chalk.yellowBright("\n[DRY RUN] The following files would be included:\n")
    );
    files.forEach((file, index) => {
      console.log(chalk.cyan(`${index + 1}. /${file.relativePath}`));
    });
    console.log(chalk.greenBright(`\nTotal files: ${files.length}\n`));
  } else {
    const writeSpinner = ora("Writing output file...").start();
    writeOutput(files);
    writeSpinner.succeed(
      chalk.greenBright(`Done! Output written to: ${finalOptions.output} 🎯`)
    );
  }
} catch (err) {
  spinner.fail("Something went wrong.");
  console.error(err);
}
