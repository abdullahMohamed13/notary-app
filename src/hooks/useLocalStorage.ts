import { useState, useEffect } from "react";

/*
  On the server the hook skips localStorage, just returns the initial value ([])

  On the client (browser) it reads from and writes to localStorage as expected
*/
export default function useLocalStorage<T>(key: string, initialVal: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedVal, setStoredVal] = useState<T>(() => {
    if (typeof window === 'undefined') {
      // During SSR: return initialVal only
      return typeof initialVal === 'function' ? (initialVal as () => T)() : initialVal;
    }

    try {
      const localVal = window.localStorage.getItem(key);
      return localVal ? JSON.parse(localVal) : initialVal;
    } catch (err) {
      return typeof initialVal === 'function' ? (initialVal as () => T)() : initialVal;
    }
  });

  useEffect(() => {
    // Only run this effect on the client
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedVal));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
    }
  }, [key, storedVal]);

  return [storedVal, setStoredVal];
}
