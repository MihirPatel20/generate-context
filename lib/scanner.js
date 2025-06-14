import fs from "fs";
import path from "path";

export function walkDirectory(basePath, config) {
  const results = [];

  function walk(dir) {
    const list = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of list) {
      const filePath = path.join(dir, file.name);
      const relativePath = path.relative(basePath, filePath);

      if (file.isDirectory()) {
        if (
          config.ignoreFolders.some((folder) => relativePath.includes(folder))
        ) {
          continue;
        }
        walk(filePath);
      } else {
        const ext = path.extname(file.name).toLowerCase().replace(".", "");
        const fileNameLower = file.name.toLowerCase();

        if (config.ignoreExtensions.includes(ext)) continue;
        if (config.ignoreFiles.includes(fileNameLower)) continue;

        results.push({ fullPath: filePath, relativePath });
      }
    }
  }

  walk(basePath);
  return results;
}
