#!/usr/bin/env bash

# no silent fails
set -euo pipefail

# script location
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# location of prompt.md
PROMPT_FILE="${SCRIPT_DIR}/prompt.md"

# read the prompt.md file
PROMPT_CONTENT=$(cat ${PROMPT_FILE})

# pipe the git diff to the llm
git add -A && git diff --staged | llm --system "${PROMPT_CONTENT}" --no-stream -m gemma3:12b | pbcopy
