import { useEffect, useRef, useState } from 'react';

export interface UseSmoothTextOptions {
  /** Minimum reveal speed. The hook speeds up automatically when it falls behind. Default 60. */
  charsPerSecond?: number;
  /** Set to false to show text immediately with no animation. Default true. */
  enabled?: boolean;
}

/**
 * Smooths a streaming LLM response so it appears character by character
 * instead of in bursty token chunks. Feed it the full text received so far;
 * it returns the portion that should be visible right now.
 *
 * - Text present on first render is shown immediately (no animation for chat history).
 * - If `text` is replaced rather than appended to, the reveal restarts.
 * - Respects `prefers-reduced-motion`.
 *
 * Pass the result to any renderer, e.g. a markdown component.
 *
 * @example
 * const { messages } = useChat(); // e.g. Vercel AI SDK
 * const visible = useSmoothText(lastMessage.content);
 * return <ReactMarkdown>{visible}</ReactMarkdown>;
 */
export function useSmoothText(
  text: string,
  { charsPerSecond = 60, enabled = true }: UseSmoothTextOptions = {}
): string {
  const [shown, setShown] = useState(text);
  const posRef = useRef(text.length);
  const shownRef = useRef(text);

  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!enabled || reduceMotion) {
      posRef.current = text.length;
      shownRef.current = text;
      setShown(text);
      return;
    }

    // New text that doesn't continue what's on screen: start over
    if (!text.startsWith(shownRef.current)) {
      posRef.current = 0;
    }

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const remaining = text.length - posRef.current;
      // Drain a large backlog quickly so the display never lags far behind the stream
      const rate = Math.max(charsPerSecond, remaining * 3);
      posRef.current = Math.min(text.length, posRef.current + rate * dt);

      const next = text.slice(0, Math.floor(posRef.current));
      if (next !== shownRef.current) {
        shownRef.current = next;
        setShown(next);
      }
      if (posRef.current < text.length) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, enabled, charsPerSecond]);

  return shown;
}
