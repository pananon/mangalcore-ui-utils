import { useEffect, useState, RefObject } from 'react';

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

/**
 * Custom hook to detect when an element is visible on the screen.
 *
 * @param elementRef The ref to the element to observe
 * @param args IntersectionObserver options
 * @returns The IntersectionObserverEntry or undefined
 */
export function useIntersectionObserver(
    elementRef: RefObject<Element>,
    {
        threshold = 0,
        root = null,
        rootMargin = '0%',
        freezeOnceVisible = false,
    }: Args = {}
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen]);

    return entry;
}
