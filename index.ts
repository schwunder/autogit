import { generateText } from 'ai';
import { createCerebras } from '@ai-sdk/cerebras';
import { $ } from "bun";
import s from "./system-prompt.md" with { type: "text" };

async function main() {
    if (!Bun.env.CEREBRAS_API_KEY) {
        console.error('CEREBRAS_API_KEY environment variable is not set. Please export your key.');
        process.exit(1);
    }

    const g = await $`git add -A && git diff --staged`.text();

    if (!g) {
        console.log("No changes to commit.");
        process.exit(0);
    }

    const cerebras = createCerebras({
        apiKey: Bun.env.CEREBRAS_API_KEY,
    });

    console.log("Generating commit message...");

    const { text } = await generateText({
        model: cerebras('qwen-3-coder-480b'),
        prompt: g,
        system: s,
    });

    await $`pbcopy < ${new Response(text)}`;
    console.log("Commit message copied to clipboard!");
}

main();
