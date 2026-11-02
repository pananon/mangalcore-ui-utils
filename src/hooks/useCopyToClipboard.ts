import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to the clipboard and exposes a `copied` flag that resets
 * after `resetAfterMs`. Handy for "Copy code" buttons on AI responses.
 *
 * @param resetAfterMs How long `copied` stays true. Default 2000.
 * @returns `copy(text)` resolves to true on success; `copied` is true right after a successful copy.
 *
 * @example
 * const { copied, copy } = useCopyToClipboard();
 * return <button onClick={() => copy(code)}>{copied ? 'Copied!' : 'Copy'}</button>;
 */
export function useCopyToClipboard(resetAfterMs: number = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfterMs);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetAfterMs]
  );

  return { copied, copy };
}
