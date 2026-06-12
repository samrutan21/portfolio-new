#!/usr/bin/env bash
#
# export-codebase.sh
# Bundles all text source files into a single Markdown file (codebase-export.md)
# suitable for uploading to the Claude desktop app so it can understand the
# whole project in one shot.
#
# Binary assets (images, icons), lockfiles, and build output are intentionally
# excluded to keep the bundle small and signal-rich.
#
# Usage: ./export-codebase.sh

set -euo pipefail

OUT="codebase-export.md"

# Patterns to exclude (binary assets, generated files, build output).
EXCLUDE_REGEX='\.(png|jpe?g|ico|svg|gif|webp|woff2?|ttf|eot)$|package-lock\.json|^build/|^node_modules/'

# Pick a fenced-code language hint based on file extension.
lang_for() {
  case "$1" in
    *.js)            echo "javascript" ;;
    *.jsx)           echo "jsx" ;;
    *.ts)            echo "typescript" ;;
    *.tsx)           echo "tsx" ;;
    *.py)            echo "python" ;;
    *.css)           echo "css" ;;
    *.html)          echo "html" ;;
    *.json)          echo "json" ;;
    *.md)            echo "markdown" ;;
    *.sh)            echo "bash" ;;
    Dockerfile)      echo "dockerfile" ;;
    *)               echo "" ;;
  esac
}

# Header + instructions for Claude.
{
  echo "# Codebase Export: portfolio-new"
  echo
  echo "_Generated on $(date '+%Y-%m-%d %H:%M:%S') by export-codebase.sh_"
  echo
  echo "This file contains the complete text source of the project, bundled into a"
  echo "single document so Claude can understand it in one pass. Binary assets"
  echo "(images, fonts), lockfiles, and build output are excluded."
  echo
  echo "## Project structure"
  echo
  echo '```'
  git ls-files | grep -vE 'package-lock\.json|^build/' || true
  echo '```'
  echo
  echo "## Source files"
  echo
} > "$OUT"

# Append each included file with a path header and fenced code block.
git ls-files | grep -vE "$EXCLUDE_REGEX" | sort | while IFS= read -r f; do
  [ -f "$f" ] || continue
  base="$(basename "$f")"
  lang="$(lang_for "${base}")"
  {
    echo "### \`$f\`"
    echo
    echo "\`\`\`${lang}"
    cat "$f"
    echo
    echo '```'
    echo
  } >> "$OUT"
done

echo "Wrote $OUT ($(wc -l < "$OUT" | tr -d ' ') lines, $(wc -c < "$OUT" | tr -d ' ') bytes)."
