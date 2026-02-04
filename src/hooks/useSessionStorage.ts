import { useState, useEffect, useCallback } from 'react';

// Event to sync changes across hooks
const SESSION_STORAGE_EVENT = 'sessionStorage-storage-event';

/**
 * Custom hook to persist state in sessionStorage.
 *
 * @param key The key to store the value under
 * @param initialValue The initial value to use if no value is stored
 * @returns [storedValue, setValue]
 */
export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    const readValue = useCallback((): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.sessionStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading sessionStorage key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
                    window.dispatchEvent(new Event(SESSION_STORAGE_EVENT));
                }
            } catch (error) {
                console.warn(`Error setting sessionStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue());
        };

        // Note: 'storage' event is mainly for localStorage across tabs, but some browsers might trigger for session too.
        // We mainly rely on our custom event for simple same-tab session sync.
        window.addEventListener(SESSION_STORAGE_EVENT, handleStorageChange);

        return () => {
            window.removeEventListener(SESSION_STORAGE_EVENT, handleStorageChange);
        };
    }, [readValue]);

    return [storedValue, setValue];
}
