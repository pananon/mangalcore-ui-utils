import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAutoScrollOptions {
  /** Distance in px from the bottom that still counts as "at the bottom". Default 80. */
  threshold?: number;
}

export interface UseAutoScrollResult<T extends HTMLElement> {
  /** Attach to the scrollable container. */
  ref: (node: T | null) => void;
  /** False once the user scrolls up; use it to show a "jump to latest" button. */
  isAtBottom: boolean;
  /** Scrolls to the bottom and re-enables sticking. */
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

/**
 * Stick-to-bottom scrolling for chat and log views. Keeps the container
 * pinned to the newest content while it grows (e.g. a streaming AI reply),
 * and stops following as soon as the user scrolls up to read.
 *
 * Content changes are detected automatically; no dependency array needed.
 *
 * @example
 * const { ref, isAtBottom, scrollToBottom } = useAutoScroll<HTMLDivElement>();
 * return (
 *   <div ref={ref} style={{ overflowY: 'auto', height: 400 }}>
 *     {messages.map((m) => <Message key={m.id} {...m} />)}
 *     {!isAtBottom && <button onClick={() => scrollToBottom()}>Jump to latest</button>}
 *   </div>
 * );
 */
export function useAutoScroll<T extends HTMLElement = HTMLDivElement>({
  threshold = 80,
}: UseAutoScrollOptions = {}): UseAutoScrollResult<T> {
  const [node, setNode] = useState<T | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const stickRef = useRef(true);

  useEffect(() => {
    if (!node) return;

    const onScroll = () => {
      const atBottom = node.scrollHeight - node.scrollTop - node.clientHeight <= threshold;
      stickRef.current = atBottom;
      setIsAtBottom(atBottom);
    };

    const follow = () => {
      if (stickRef.current) node.scrollTop = node.scrollHeight;
    };

    const mutations = new MutationObserver(follow);
    mutations.observe(node, { childList: true, subtree: true, characterData: true });
    const resizes = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(follow) : null;
    resizes?.observe(node);

    node.addEventListener('scroll', onScroll, { passive: true });
    follow();

    return () => {
      mutations.disconnect();
      resizes?.disconnect();
      node.removeEventListener('scroll', onScroll);
    };
  }, [node, threshold]);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      if (!node) return;
      stickRef.current = true;
      setIsAtBottom(true);
      node.scrollTo({ top: node.scrollHeight, behavior });
    },
    [node]
  );

  return { ref: setNode, isAtBottom, scrollToBottom };
}
