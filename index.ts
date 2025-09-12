import { generateText } from 'ai';
import { createCerebras } from '@ai-sdk/cerebras';
import { $ } from "bun";
import p from "./prompt.md" with { type: "text" };
const g = await $`git add -A && git diff --staged`.text();
if (!Bun.env.CEREBRAS_API_KEY) {
    console.error('export your cerebras key');
}
else {
    console.log('found your cerebras key');
}
const cerebras = createCerebras({
    apiKey: Bun.env.CEREBRAS_API_KEY ?? '',
});

const { text } = await generateText({
    model: cerebras('qwen-3-coder-480b'),
    prompt: g,
    system: p,
});

console.log(text);

await $`pbcopy < ${new Response(text)}`;