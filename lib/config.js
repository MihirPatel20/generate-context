import fs from "fs";
import path from "path";

const DEFAULT_ALWAYS_IGNORE_FOLDERS = [
  ".git",
  ".vscode",
  "node_modules",
  "dist",
];
const DEFAULT_ALWAYS_IGNORE_FILES = [
  ".env",
  "package-lock.json",
  ".generatecontextrc.json",
  "prompt-context.txt",
];

const DEFAULT_CONFIG = {
  path: process.cwd(),
  output: "prompt-context.txt",
  ignoreFolders: [],
  ignoreExtensions: ["bat", "log", "tmp"],
  ignoreFiles: [],
  priorityFiles: ["readme.md"], // always default README.md (case-insensitive)
  dryRun: false,
};

function normalizeInput(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((s) => s.trim()).filter(Boolean);
  if (typeof input === "string")
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

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
    ...normalizeInput(cliOptions.ignoreFolders ?? fileConfig.ignoreFolders),
  ];

  const ignoreFiles = [
    ...DEFAULT_ALWAYS_IGNORE_FILES,
    ...normalizeInput(cliOptions.ignoreFiles ?? fileConfig.ignoreFiles),
  ];

  const ignoreExtensions = normalizeInput(
    cliOptions.ignoreExtensions ??
      fileConfig.ignoreExtensions ??
      DEFAULT_CONFIG.ignoreExtensions
  ).map((s) => s.toLowerCase());

  const priorityFiles = [
    ...DEFAULT_CONFIG.priorityFiles,
    ...normalizeInput(
      cliOptions.priorityFiles ?? fileConfig.priorityFiles ?? []
    ),
  ].map((s) => s.toLowerCase());

  return {
    path: basePath,
    output: cliOptions.output || fileConfig.output || DEFAULT_CONFIG.output,
    ignoreFolders,
    ignoreFiles: ignoreFiles.map((f) => f.toLowerCase()),
    ignoreExtensions,
    priorityFiles,
    dryRun: cliOptions.dryRun ?? fileConfig.dryRun ?? DEFAULT_CONFIG.dryRun,
  };
}
