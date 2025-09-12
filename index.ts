import { $ } from "bun";
import p from "./prompt.md" with { type: "text" };
const g = await $`git add -A && git diff --staged`.text();
const llm = await $`llm -s ${p} --no-stream -m gemma3:12b ${g}`.text();
await $`pbcopy < ${new Response(llm)}`;