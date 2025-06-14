# 📝 generate-context

A simple, flexible CLI tool to generate context files from any folder structure — perfect for AI, LLMs, prompt engineering, code agents, embeddings, or training data prep.

## 🚀 Features

- 🔥 Recursively scans files & nested folders
- 🔥 Fully configurable file filtering
- 🔥 Exclude unwanted folders, file extensions, or specific files
- 🔥 Dry-run mode to preview files before generating
- 🔥 Supports config files (`.generatecontextrc.json`)
- 🔥 Clean LLM-friendly file structure output
- 🔥 Beautiful colored output with spinners 🎨
- 🔥 Fast & lightweight pure Node.js CLI

## 📦 Installation

Clone the repo & install dependencies:

```bash
git clone <your-repo-url>
cd generate-context
npm install
```

Link globally to use the command anywhere:

```bash
npm link
```

✅ Done.

## ⚡ Usage

Simply run inside any project folder:

```bash
generate-context
```

It will scan the current directory recursively and generate `prompt-context.txt` like this:

```txt
FILE: /src/file1.js
BEGIN FILE CONTENT
<file content here>
END FILE CONTENT

---
FILE: /public/index.html
BEGIN FILE CONTENT
<file content here>
END FILE CONTENT

```

## 🔧 CLI Options

| Option                             | Description                                        | Default                     |
| ---------------------------------- | -------------------------------------------------- | --------------------------- |
| `-p, --path <path>`                | Path to scan                                       | Current directory (`.`)     |
| `-o, --output <filename>`          | Output filename                                    | `prompt-context.txt`        |
| `--ignore-folders <folders>`       | Comma-separated folders to ignore                  | `.git,.vscode,node_modules` |
| `--ignore-extensions <extensions>` | Comma-separated file extensions to ignore (no dot) | `bat,log,tmp`               |
| `--exclude-files <files>`          | Comma-separated specific filenames to exclude      | `package-lock.json,.env`    |
| `--dry-run`                        | Show files that would be included without writing  | `false`                     |

## 🔧 Config File Support (`.generatecontextrc.json`)

You can create a config file in your project root:

```json
{
  "output": "my-context.txt",
  "ignoreFolders": ".git,.vscode,node_modules,dist,coverage",
  "ignoreExtensions": "bat,log,tmp,env",
  "excludeFiles": "package-lock.json,.env",
  "dryRun": false
}
```

When config file exists:

- You don't need to pass any CLI args.
- CLI args will always override config values if provided.

Example:

```bash
generate-context
```

It will automatically apply your saved config.

## 🔥 Examples

### Basic usage (default)

```bash
generate-context
```

### Scan a specific folder

```bash
generate-context --path ./src
```

### Change output file name

```bash
generate-context --output context.txt
```

### Ignore extra folders

```bash
generate-context --ignore-folders .git,node_modules,dist,coverage
```

### Ignore file extensions

```bash
generate-context --ignore-extensions log,tmp,env
```

### Exclude specific files

```bash
generate-context --exclude-files package-lock.json,.env,.DS_Store
```

### Combine everything (fully customized)

```bash
generate-context --path ./backend --output my-context.txt --ignore-folders .git,.cache,dist --ignore-extensions log,tmp --exclude-files package-lock.json,.env
```

### Dry-run mode (preview without writing file)

```bash
generate-context --dry-run
```

## 📊 Output format (LLM optimized)

```txt
FILE: /relative/path/to/file.js
BEGIN FILE CONTENT
<actual file content>
END FILE CONTENT

---
```

👉 This format is designed for LLMs to easily parse and understand multi-file context.

## 💡 Why this tool?

LLMs work best when you provide context from your actual code/files in a structured way.
This tool simplifies packaging your project files as clean input for AI agents, embeddings, or few-shot prompt chains.

## 🤝 Contributions Welcome!

Feel free to open issues or PRs if you wanna improve or extend the tool.

Made with ❤️ by Mihir Patel