import { useRef } from 'react';

export default function useDebouncedPromise(fn, delay) {
  let timeoutRef = useRef(null);

  function handler(...params) {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(async () => {
        try {
          const response = await fn(...params);
          resolve(response)
        } catch(e) {
          reject(e);
        }
      }, delay);
    });
  }
  return handler;
}
