import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to throttle a value.
 * Ensures the value only updates at most once per specified interval.
 *
 * @param value The value to throttle
 * @param interval The throttling interval in milliseconds
 * @returns The throttled value
 */
export function useThrottle<T>(value: T, interval: number = 500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastUpdated = useRef<number>(Date.now());

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastUpdate = now - lastUpdated.current;

        if (timeSinceLastUpdate >= interval) {
            setThrottledValue(value);
            lastUpdated.current = now;
        } else {
            const timeoutId = setTimeout(() => {
                setThrottledValue(value);
                lastUpdated.current = Date.now();
            }, interval - timeSinceLastUpdate);

            return () => clearTimeout(timeoutId);
        }
    }, [value, interval]);

    return throttledValue;
}
