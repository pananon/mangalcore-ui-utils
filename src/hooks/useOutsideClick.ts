import { useEffect, RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Custom hook to detect clicks outside of a specified element.
 * Useful for closing dropdowns, modals, etc.
 *
 * @param ref Ref of the element to detect outside clicks for
 * @param handler Callback function to execute on outside click
 * @param mouseEvent The mouse event to listen for ('mousedown' or 'mouseup')
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener(mouseEvent, listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener(mouseEvent, listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, mouseEvent]);
}
