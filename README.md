# 📝 generate-context

Effortless context file generator for AI, LLMs, prompt engineering, code agents & embeddings.
Recursively grabs your codebase, filters noise, and spits out clean, LLM-friendly context files. 🚀

## 🚀 Features

- Recursively scans files & nested folders
- Fully configurable file filtering
- Exclude unwanted folders, extensions, or specific files
- Dry-run mode to preview files
- Config file support (`.generatecontextrc.json`)
- Clean, LLM-friendly file output format
- Beautiful colored output with spinners 🎨
- Fast & lightweight pure Node.js CLI

## 📦 Installation

Clone the repo & install dependencies:

```bash
git clone <your-repo-url>
cd generate-context
npm install
```

Optional: link globally to use `generate-context` command anywhere:

```bash
npm link
```

Or simply:

```bash
npm install -g .
```

✅ You're good to go.

## ⚡ Quick Usage

Simply run inside any project folder:

```bash
generate-context
```

This will scan the current directory and create `prompt-context.txt` like:

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

| Option                             | Description                                        | Default                                                                   |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| `-p, --path <path>`                | Path to scan                                       | Current directory (`.`)                                                   |
| `-o, --output <filename>`          | Output filename                                    | `prompt-context.txt`                                                      |
| `--ignore-folders <folders>`       | Comma-separated folders to ignore                  | `.git` `.vscode` `node_modules` `dist`                                    |
| `--ignore-extensions <extensions>` | Comma-separated file extensions to ignore (no dot) | `bat` `log` `tmp`                                                         |
| `--ignore-files <files>`           | Comma-separated specific filenames to ignore       | `.env` `package-lock.json` `.generatecontextrc.json` `prompt-context.txt` |
| `--dry-run`                        | Show files that would be included without writing  | `false`                                                                   |

## 🔧 Config File Support (`.generatecontextrc.json`)

You can create a config file in your project root:

```json
{
  "output": "my-context.txt",
  "ignoreFolders": ".git,.vscode,node_modules,dist,coverage",
  "ignoreExtensions": "bat,log,tmp,env",
  "ignoreFiles": "package-lock.json,.env",
  "dryRun": false
}
```

- If config exists, you don't need any CLI args.
- CLI flags always override config values.

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

### Ignore specific files

```bash
generate-context --ignore-files package-lock.json,.env,.DS_Store
```

### Combine everything (fully customized)

```bash
generate-context --path ./backend --output my-context.txt --ignore-folders .git,.cache,dist --ignore-extensions log,tmp --ignore-files package-lock.json,.env
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

```

👉 This format is designed for LLMs to easily parse and understand multi-file context.
✅ Easy to parse
✅ No YAML or JSON headaches
✅ Perfect for LLM context injection

## 💡 Why this tool?

LLMs work way better when you feed them clean, structured context from your codebase.
`generate-context` helps you package your files into simple, predictable formats for:

- AI agents
- Embeddings
- Prompt chains
- Fine-tuning data prep
- Code summarization pipelines

## 🤝 Contribute

Got ideas? Found bugs?
Issues, PRs, and feedback are always welcome

Made with ❤️ by Mihir Patel
