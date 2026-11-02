---
"@mangalcore/ui-utils": minor
---

AI chat UI and SEO utilities, plus a Next.js App Router fix.

- New: `useSmoothText` and `<StreamingText />` for smooth streaming LLM output, `useAutoScroll` (stick-to-bottom chat scrolling), `useAutoResizeTextarea`, `useCopyToClipboard`, and `<JsonLd />` for schema.org structured data.
- Fix: the bundle now keeps its `'use client'` directive, so components can be rendered from Next.js Server Components. Previously the build stripped it.
- New `@mangalcore/ui-utils/server` entry with server-safe exports (`JsonLd`, `formatBytes`).
- Added an `exports` map and ship `llms.txt`, a one-file API reference for AI coding assistants.
