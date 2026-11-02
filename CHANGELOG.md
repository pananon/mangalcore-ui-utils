# @mangalcore/ui-utils

## 0.1.0

### Minor Changes

- 0c1938e: AI chat UI and SEO utilities, plus a Next.js App Router fix.
  - New: `useSmoothText` and `<StreamingText />` for smooth streaming LLM output, `useAutoScroll` (stick-to-bottom chat scrolling), `useAutoResizeTextarea`, `useCopyToClipboard`, and `<JsonLd />` for schema.org structured data.
  - Fix: the bundle now keeps its `'use client'` directive, so components can be rendered from Next.js Server Components. Previously the build stripped it.
  - New `@mangalcore/ui-utils/server` entry with server-safe exports (`JsonLd`, `formatBytes`).
  - Added an `exports` map and ship `llms.txt`, a one-file API reference for AI coding assistants.

## 0.0.5

### Patch Changes

- Added 10 new hooks: useDebounce, useThrottle, useLocalStorage, useSessionStorage, useOutsideClick, useMediaQuery, useWindowSize, useIntersectionObserver, useScrollLock, usePrevious.

## 0.0.4

### Patch Changes

- 7fa4134: Added 6 cool new components: GradientText, Marquee, RippleButton, ReadingProgress, SpotlightCard, FadeIn.

## 0.0.3

### Patch Changes

- 66b1654: Added 7 new components: TruncatedText, StatusDot, KeyboardShortcut, SkeletonLoader, ClickOutside, Portal, CountUp.

## 0.0.2

### Patch Changes

- 1c79bfa: Initial release of 10 utility components.
