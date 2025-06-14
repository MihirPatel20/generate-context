import fs from "fs";
import path from "path";

export function walkDirectory(basePath, config) {
  const allFiles = [];

  function walk(dir) {
    const list = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of list) {
      const filePath = path.join(dir, entry.name);
      const relativePath = path.relative(basePath, filePath);
      const fileNameLower = entry.name.toLowerCase();

      if (entry.isDirectory()) {
        if (
          config.ignoreFolders.some((folder) => relativePath.includes(folder))
        ) {
          continue;
        }
        walk(filePath);
      } else {
        const ext = path.extname(entry.name).toLowerCase().replace(".", "");
        if (config.ignoreExtensions.includes(ext)) continue;
        if (config.ignoreFiles.includes(fileNameLower)) continue;

        allFiles.push({
          fullPath: filePath,
          relativePath,
          fileNameLower,
        });
      }
    }
  }

  walk(basePath);

  // Order respecting priority logic:
  const priority = [];
  const remaining = [...allFiles];

  for (const pFile of config.priorityFiles) {
    for (let i = 0; i < remaining.length; i++) {
      const file = remaining[i];
      if (file.fileNameLower === pFile) {
        priority.push(file);
        remaining.splice(i, 1);
        i--; // adjust index since we spliced
      }
    }
  }

  return [...priority, ...remaining];
}
