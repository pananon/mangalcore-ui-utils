# @mangalcore/ui-utils

A portfolio-quality collection of tiny, production-ready React utility components for SaaS dashboards and Next.js apps.

![NPM Version](https://img.shields.io/npm/v/@mangalcore/ui-utils?color=blue&style=flat-square)
![License](https://img.shields.io/npm/l/@mangalcore/ui-utils?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/@mangalcore/ui-utils?style=flat-square)

## Features

- 🚀 **Tiny & Tree-shakable**: Import only what you need.
- ⚡ **Zero Setup**: Works with Vite, Next.js, and CRA.
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

## Next.js Note

This library is fully compatible with Next.js App Router. All components are exported as client components where necessary ("use client").

## Roadmap

- [ ] Add more data visualization components
- [ ] Add form helpers
- [ ] Add accessible tooltips

## License

MIT © [MangalCore](https://github.com/pananon)
