# @mangalcore/ui-utils

Tiny, production-ready React components and hooks for Next.js and AI apps: streaming LLM text, stick-to-bottom chat scroll, auto-growing prompt inputs, JSON-LD for SEO, and 30+ dashboard and landing-page utilities.

![NPM Version](https://img.shields.io/npm/v/@mangalcore/ui-utils?color=blue&style=flat-square)
![License](https://img.shields.io/npm/l/@mangalcore/ui-utils?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@mangalcore/ui-utils?style=flat-square)

## Features

- 🚀 **Tiny & Tree-shakable**: Import only what you need.
- ⚡ **Zero Setup**: Works with Vite, Next.js (App Router safe), and CRA.
- 🤖 **AI-ready**: Chat UI hooks for streaming responses, plus an `llms.txt` API reference for coding assistants.
- 🎨 **Minimal Styling**: Easy to override with CSS modules or Tailwind.
- 📘 **TypeScript**: First-class type support.
- 📦 **ESM + CJS**: Compatible with modern and legacy bundlers.

## Installation

```bash
npm install @mangalcore/ui-utils
# or
pnpm add @mangalcore/ui-utils
# or
yarn add @mangalcore/ui-utils
```

## Usage

```tsx
import { CopyToClipboard, TimeAgo } from '@mangalcore/ui-utils';

function App() {
  return (
    <div>
      <CopyToClipboard text="Hello World" />
      <TimeAgo date={new Date()} />
    </div>
  );
}
```

## Components

### 1. CopyToClipboard
A button that copies text to the clipboard and shows a toast notification.
```tsx
<CopyToClipboard text="npm install @mangalcore/ui-utils" />
```

### 2. TimeAgo
Displays a live-updating relative time string (e.g., "5 minutes ago").
```tsx
<TimeAgo date={new Date('2023-01-01')} />
```

### 3. AvatarFromName
Generates a deterministic avatar based on a name string.
```tsx
<AvatarFromName name="John Doe" size={40} />
```

### 4. MaskedText
Masks sensitive text with asterisks, revealing only a few characters.
```tsx
<MaskedText value="sk_live_1234567890" visibleChars={4} />
```

### 5. FileSize
Formats bytes into human-readable strings (KB, MB, GB).
```tsx
<FileSize bytes={1024 * 1024 * 5} />
```

### 6. LatencyBadge
Displays a colored badge based on latency (ms).
```tsx
<LatencyBadge ms={45} /> // Green
<LatencyBadge ms={250} /> // Yellow
<LatencyBadge ms={800} /> // Red
```

### 7. ProgressRing
A circular progress indicator using SVG.
```tsx
<ProgressRing percent={75} size={60} />
```

### 8. JsonViewer
A collapsible JSON tree viewer for debugging.
```tsx
<JsonViewer data={{ foo: 'bar', baz: [1, 2, 3] }} />
```

### 9. QRCodeWrapper
A client-safe QR code component (Next.js compatible).
```tsx
<QRCodeWrapper value="https://example.com" size={128} />
```

### 10. SafeImage
An image component with a fallback for broken URLs.
```tsx
<SafeImage src="broken.jpg" fallback="placeholder.png" />
```

### 11. TruncatedText
Truncates long text with a "Read more / Show less" toggle.
```tsx
<TruncatedText text="Long description..." charLimit={100} />
```

### 12. StatusDot
Shows a status indicator (online, offline, busy, away, or custom).
```tsx
<StatusDot status="online" />
<StatusDot status="busy" pulse />
```

### 13. KeyboardShortcut
Displays styled hotkeys (e.g., ⌘ + K).
```tsx
<KeyboardShortcut keys={['⌘', 'K']} />
```

### 14. SkeletonLoader
A pulsing placeholder for loading states.
```tsx
<SkeletonLoader width={200} height={20} borderRadius={4} />
```

### 15. ClickOutside
Detects clicks outside of the wrapped element.
```tsx
<ClickOutside onClickOutside={() => closeDropdown()}>
  <div className="dropdown">...</div>
</ClickOutside>
```

### 16. Portal
Renders content into `document.body` (useful for modals/tooltips).
```tsx
<Portal>
  <div className="modal">I am attached to body!</div>
</Portal>
```

### 17. CountUp
Animates a number from start to end when it comes into view.
```tsx
<CountUp end={100} duration={2000} prefix="$" />
```

### 18. GradientText
Renders text with a gradient background (supports animation).
```tsx
<GradientText from="#3b82f6" to="#a855f7" animate>
  Cool Gradient Header
</GradientText>
```

### 19. Marquee
Infinite scrolling container for logo walls or announcements.
```tsx
<Marquee duration={30} gap={40}>
  <Logo1 /> <Logo2 /> <Logo3 />
</Marquee>
```

### 20. RippleButton
A button with a Material-UI style ripple click effect.
```tsx
<RippleButton onClick={handleClick}>Click Me</RippleButton>
```

### 21. SpotlightCard
A card with a glowing spotlight effect that follows the mouse cursor.
```tsx
<SpotlightCard style={{ padding: 20 }}>
  <h3>Hover Me</h3>
</SpotlightCard>
```

### 22. FadeIn
Animates content entry (fade in + slide up) when it enters the viewport.
```tsx
<FadeIn delay={200} direction="up">
  <p>I appear smoothly on scroll.</p>
</FadeIn>
```

### 23. ReadingProgress
A fixed top bar that indicates how far the user has scrolled.
```tsx
<ReadingProgress color="#8b5cf6" height={4} />
```

## AI chat UI & SEO

Building a chatbot or AI app? These cover the parts every chat UI ends up hand-rolling.

### useSmoothText / StreamingText
LLM streams arrive in bursty chunks. `useSmoothText` turns them into a steady typing reveal and works with any renderer (including markdown). `StreamingText` is the plain-text version with a blinking cursor.
```tsx
<StreamingText text={completion} isStreaming={isLoading} />

// or with markdown
const visible = useSmoothText(message.content);
return <ReactMarkdown>{visible}</ReactMarkdown>;
```

### useAutoScroll
Stick-to-bottom scrolling. Follows new content while a reply streams in and stops following when the user scrolls up to read.
```tsx
const { ref, isAtBottom, scrollToBottom } = useAutoScroll<HTMLDivElement>();

<div ref={ref} style={{ height: 500, overflowY: 'auto' }}>
  {messages.map((m) => <Message key={m.id} {...m} />)}
</div>
{!isAtBottom && <button onClick={() => scrollToBottom()}>Jump to latest</button>}
```

### useAutoResizeTextarea
A prompt box that grows with its content, then scrolls past `maxHeight`.
```tsx
const ref = useAutoResizeTextarea(input, { maxHeight: 200 });
<textarea ref={ref} rows={1} value={input} onChange={(e) => setInput(e.target.value)} />
```

### useCopyToClipboard
```tsx
const { copied, copy } = useCopyToClipboard();
<button onClick={() => copy(code)}>{copied ? 'Copied!' : 'Copy'}</button>
```

### JsonLd
schema.org structured data for rich search results. Escapes `<` so content can't break out of the script tag.
```tsx
import { JsonLd } from '@mangalcore/ui-utils/server'; // works in Server Components

<JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', name: 'Acme Widget' }} />
```

## Hooks

### 1. useDebounce
Delays updating a value until a specified time has passed without further changes.
```tsx
const debouncedValue = useDebounce(inputValue, 500);
```

### 2. useThrottle
Ensures a value is updated at most once per specified interval.
```tsx
const throttledScroll = useThrottle(scrollPosition, 100);
```

### 3. useLocalStorage
Syncs state with `localStorage` (updates across tabs).
```tsx
const [name, setName] = useLocalStorage('current-user', 'Guest');
```

### 4. useSessionStorage
Syncs state with `sessionStorage` (cleared when tab closes).
```tsx
const [token, setToken] = useSessionStorage('auth-token', '');
```

### 5. useOutsideClick
Detects clicks outside a specific element (useful for dropdowns/modals).
```tsx
const ref = useRef(null);
useOutsideClick(ref, () => setOpen(false));
```

### 6. useMediaQuery
Returns true if the current window matches the media query.
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
```

### 7. useWindowSize
Tracks the window dimensions.
```tsx
const { width, height } = useWindowSize();
```

### 8. useIntersectionObserver
Detects when an element is visible in the viewport.
```tsx
const ref = useRef(null);
const entry = useIntersectionObserver(ref, { threshold: 0.5 });
// entry?.isIntersecting
```

### 9. useScrollLock
Locks the body scroll (useful for modals).
```tsx
useScrollLock(isModalOpen);
```

### 10. usePrevious
Tracks the previous value of a state or prop.
```tsx
const prevCount = usePrevious(count);
```

## Next.js App Router

The main entry is marked `'use client'`, so you can render these components from Server Components without adding a directive yourself. Pass only serializable props from a Server Component; props that take functions (like `onClickOutside`) need a Client Component parent. Hooks are called from your own Client Components, as usual.

For code that runs on the server (Server Components, route handlers, `generateMetadata`), use the server entry. It has no client boundary:

```tsx
import { JsonLd, formatBytes } from '@mangalcore/ui-utils/server';
```

## For AI coding assistants

The package ships an [`llms.txt`](./llms.txt) with the full API in one file: every component, hook and prop. Point your assistant at `node_modules/@mangalcore/ui-utils/llms.txt`, or at the copy on GitHub. Every export also has JSDoc with examples, so editors and agents see usage in the type definitions.

## Roadmap

- [ ] Add more data visualization components
- [ ] Add form helpers
- [ ] Add accessible tooltips

## License

MIT © [MangalCore](https://github.com/pananon)
