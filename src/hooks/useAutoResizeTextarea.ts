import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';

export interface UseAutoResizeTextareaOptions {
  /** Height in px after which the textarea scrolls instead of growing. Default 240. */
  maxHeight?: number;
}

/**
 * Grows a textarea to fit its content, like the prompt box in ChatGPT or Claude.
 * Pass the current value so it re-measures on every change.
 *
 * @example
 * const [input, setInput] = useState('');
 * const ref = useAutoResizeTextarea(input, { maxHeight: 200 });
 * return <textarea ref={ref} rows={1} value={input} onChange={(e) => setInput(e.target.value)} />;
 */
export function useAutoResizeTextarea(
  value: string,
  { maxHeight = 240 }: UseAutoResizeTextareaOptions = {}
) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const height = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${height}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [value, maxHeight]);

  return ref;
}
