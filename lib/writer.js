import fs from "fs";
import chalk from "chalk";

export function writeOutput(files, outputFile) {
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
