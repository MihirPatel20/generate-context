# 📝 generate-context

Effortless context file generator for AI, LLMs, prompt engineering, code agents & embeddings.  
Recursively grabs your codebase, filters noise, and spits out clean, LLM-friendly context files. 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Features

- Recursively scans files & nested folders
- Fully configurable file filtering
- Priority files ordering (put your important files on top!)
- Auto prioritizes `README.md` by default
- Works for files at any depth
- Exclude unwanted folders, extensions, or specific files
- Supports both CLI args & config file
- Friendly CLI: supports comma-separated OR space-separated inputs
- Dry-run mode to preview files
- Clean, LLM-friendly output format
- Beautiful colored CLI output 🎨
- Fast & lightweight pure Node.js CLI

## 📦 Installation

Clone the repo & install dependencies:

```bash
git clone <your-repo-url>
cd generate-context
npm install
```

Optional: link globally:

```bash
npm link
```

Or:

```bash
npm install -g .
```

## ⚡ Quick Usage

```bash
generate-context
```

Scans current directory and creates `prompt-context.txt` like:

```txt
FILE: /src/file1.js
BEGIN FILE CONTENT
<file content here>
END FILE CONTENT

FILE: /public/index.html
BEGIN FILE CONTENT
<file content here>
END FILE CONTENT
```

## 🔧 CLI Options

| Option                                    | Description                                                    | Default                                                                   |
| ----------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `-p, --path <path>`                       | Path to scan                                                   | `.`                                                                       |
| `-o, --output <filename>`                 | Output filename                                                | `prompt-context.txt`                                                      |
| `-F, --ignore-folders [folders...]`       | Folders to ignore (space/comma separated)                      | `.git` `.vscode` `node_modules` `dist`                                    |
| `-f, --ignore-files [files...]`           | Files to ignore (space/comma separated)                        | `.env` `package-lock.json` `.generatecontextrc.json` `prompt-context.txt` |
| `-e, --ignore-extensions [extensions...]` | Extensions to ignore (space/comma separated, no dot)           | `bat` `log` `tmp`                                                         |
| `-P, --priority-files [files...]`         | Files to always place on top (space/comma separated, any path) | `README.md` always default                                                |
| `-d, --dry-run`                           | Show files that would be included without writing              | `false`                                                                   |

✅ Both comma `,` and space-separated values are supported.

## 🔧 Config File Support (`.generatecontextrc.json`)

You can also configure via file in project root:

```json
{
  "output": "my-context.txt",
  "ignoreFolders": [".git", ".vscode", "node_modules", "dist", "coverage"],
  "ignoreExtensions": ["bat", "log", "tmp", "env"],
  "ignoreFiles": ["package-lock.json", ".env"],
  "dryRun": false
}
```

- CLI flags always override config values.
- Priority files take absolute priority regardless of directory depth.

## 🔥 Examples

### Default usage

```bash
generate-context
```

### Custom priority files

```bash
generate-context -P index.js bin/cli.js src/app.js
```

### Scan specific folder

```bash
generate-context -p ./src
```

### Change output filename

```bash
generate-context -o context.txt
```

### Ignore folders

```bash
generate-context -F dist .cache coverage
# OR
generate-context --ignore-folders dist,.cache,coverage
```

### Ignore file extensions

```bash
generate-context -e log tmp env
# OR
generate-context --ignore-extensions log,tmp,env
```

### Ignore specific files

```bash
generate-context -f .env .DS_Store package-lock.json
# OR
generate-context --ignore-files .env,.DS_Store,package-lock.json
```

### Combine everything

```bash
generate-context -p ./backend -o my-context.txt -F dist .cache -e log tmp -f .env package-lock.json -P index.js schema/prisma/schema.prisma -d
```

### Dry-run mode

```bash
generate-context -d
```

## 📊 Output format (LLM optimized)

```txt
FILE: /relative/path/to/file.js
BEGIN FILE CONTENT
<actual file content>
END FILE CONTENT
```

- ✅ Easy to parse
- ✅ No YAML or JSON headaches
- ✅ Perfect for LLM context injection

## 💡 Why this tool?

LLMs work better with clean, structured context from your codebase.
`generate-context` helps you package your files into simple, predictable formats for:

- AI agents
- Embeddings
- Prompt chains
- Fine-tuning data prep
- Code summarization pipelines

## 🤝 Contribute

Got ideas? Found bugs?
Issues, PRs, and feedback always welcome!

Made with ❤️ by Mihir Patel
