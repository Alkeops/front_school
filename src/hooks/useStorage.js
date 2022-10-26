import { useCallback, useState } from "react";


export const useStorage = (
    key,
    initialValue,
    type = "localStorage"
) => {
    const readValue = useCallback(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window[type].getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.warn(`Error reading ${type} key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key, type]);

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = useCallback(
        (value) => {
            if (typeof window === "undefined") return;
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window[type].setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn(`Error setting ${type} key "${key}":`, error);
            }
        },
        [key, storedValue, type]
    );

    return [storedValue, setValue];
};
