import fs from "fs";
import path from "path";

const DEFAULT_ALWAYS_IGNORE_FOLDERS = [
  ".git",
  ".vscode",
  "node_modules",
  "dist",
];
const DEFAULT_ALWAYS_EXCLUDE_FILES = [
  ".env",
  "package-lock.json",
  ".generatecontextrc.json",
  "prompt-context.txt",
];

const DEFAULT_CONFIG = {
  path: process.cwd(),
  output: "prompt-context.txt",
  ignoreFolders: "",
  ignoreExtensions: "bat,log,tmp",
  excludeFiles: "",
  dryRun: false,
};

export function loadConfig(cliOptions) {
  const basePath = path.resolve(cliOptions.path || DEFAULT_CONFIG.path);
  const configFile = path.join(basePath, ".generatecontextrc.json");

  let fileConfig = {};
  if (fs.existsSync(configFile)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(configFile, "utf8"));
    } catch (e) {
      console.error("Error parsing config file:", e);
      process.exit(1);
    }
  }

  const ignoreFolders = [
    ...DEFAULT_ALWAYS_IGNORE_FOLDERS,
    ...(cliOptions.ignoreFolders?.split(",") ||
      fileConfig.ignoreFolders?.split(",") ||
      []),
  ]
    .map((f) => f.trim())
    .filter(Boolean);

  const excludeFiles = [
    ...DEFAULT_ALWAYS_EXCLUDE_FILES,
    ...(cliOptions.excludeFiles?.split(",") ||
      fileConfig.excludeFiles?.split(",") ||
      []),
  ]
    .map((f) => f.trim())
    .filter(Boolean);

  return {
    path: basePath,
    output: cliOptions.output || fileConfig.output || DEFAULT_CONFIG.output,
    ignoreFolders,
    ignoreExtensions: (
      cliOptions.ignoreExtensions ||
      fileConfig.ignoreExtensions ||
      DEFAULT_CONFIG.ignoreExtensions
    )
      .split(",")
      .map((s) => s.trim().toLowerCase()),
    excludeFiles: excludeFiles.map((f) => f.toLowerCase()),
    dryRun: cliOptions.dryRun ?? fileConfig.dryRun ?? DEFAULT_CONFIG.dryRun,
  };
}
