import { useRef, useLayoutEffect } from 'react';

/**
 * Custom hook to lock body scroll.
 * Useful for modals to prevent background scrolling.
 *
 * @param lock Whether to lock the scroll or not
 */
export function useScrollLock(lock: boolean = true) {
    // Use useLayoutEffect to prevent layout shift before painting
    // but fallback to useEffect for SSR safety if needed (though usually client-side)
    // standard useEffect is often enough but useLayoutEffect can be smoother for UI blocking

    // We need to store the original style to restore it later
    const originalStyle = useRef<string>('');

    useLayoutEffect(() => {
        if (!lock) return;

        // Save original body overflow
        originalStyle.current = window.getComputedStyle(document.body).overflow;

        // Lock scroll
        document.body.style.overflow = 'hidden';

        return () => {
            // Restore original body overflow
            document.body.style.overflow = originalStyle.current;
        };
    }, [lock]);
}
