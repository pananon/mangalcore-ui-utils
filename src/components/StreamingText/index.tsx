'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useSmoothText } from '../../hooks/useSmoothText';

export interface StreamingTextProps {
  /** Full text received so far. Keep appending to it as tokens arrive. */
  text: string;
  /** Shows the cursor while true. */
  isStreaming?: boolean;
  /** Smooth bursty token chunks into a steady typing effect. Default true. */
  smooth?: boolean;
  /** Minimum reveal speed when `smooth` is on. Default 60. */
  charsPerSecond?: number;
  /** Custom cursor, or `false` to hide it. Defaults to a blinking block. */
  cursor?: ReactNode | false;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders a streaming AI response as plain text with a blinking cursor.
 * For markdown output, use the `useSmoothText` hook with your markdown renderer instead.
 *
 * @example
 * <StreamingText text={completion} isStreaming={isLoading} />
 */
export function StreamingText({
  text,
  isStreaming = false,
  smooth = true,
  charsPerSecond,
  cursor,
  className,
  style,
}: StreamingTextProps) {
  const visible = useSmoothText(text, { enabled: smooth, charsPerSecond });
  const showCursor = isStreaming || visible.length < text.length;

  return (
    <span
      className={className}
      style={{ whiteSpace: 'pre-wrap', ...style }}
      aria-busy={isStreaming}
    >
      {visible}
      {showCursor &&
        cursor !== false &&
        (cursor ?? (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '0.5em',
              height: '1em',
              marginLeft: 2,
              verticalAlign: 'text-bottom',
              backgroundColor: 'currentColor',
              animation: 'mangalcore-blink 1s steps(2, start) infinite',
            }}
          />
        ))}
      <style>
        {`
          @keyframes mangalcore-blink {
            to { visibility: hidden; }
          }
        `}
      </style>
    </span>
  );
}
