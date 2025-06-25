import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialVal: T | (() => T)):[T, React.Dispatch<React.SetStateAction<T>>] {
    const [storedVal, setStoredVal] = useState<T>(() => {
        try {
            const localVal = localStorage.getItem(key);
            return localVal ? JSON.parse(localVal) : initialVal;
        } catch(err) {
            return initialVal;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedVal));
    }, [key, storedVal]);

    return [storedVal, setStoredVal] as [T, typeof setStoredVal];
}
