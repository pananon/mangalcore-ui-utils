import { useState, useEffect, useCallback } from 'react';

// Event to sync changes across hooks
const STORAGE_EVENT = 'localStorage-storage-event';

/**
 * Custom hook to persist state in localStorage.
 * Syncs usage across tabs and components.
 *
 * @param key The key to store the value under
 * @param initialValue The initial value to use if no value is stored
 * @returns [storedValue, setValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // Get from local storage then
    // parse stored json or if none return initialValue
    const readValue = useCallback((): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
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
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                    // Dispatch a custom event so other hooks can update
                    window.dispatchEvent(new Event(STORAGE_EVENT));
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
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

        // Listen for changes from other tabs/windows
        window.addEventListener('storage', handleStorageChange);
        // Listen for changes from same window (our custom event)
        window.addEventListener(STORAGE_EVENT, handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener(STORAGE_EVENT, handleStorageChange);
        };
    }, [readValue]);

    return [storedValue, setValue];
}
