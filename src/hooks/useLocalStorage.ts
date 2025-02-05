import {useEffect, useState} from 'react';

export const LOCAL_STORAGE_CHANGE_EVENT = 'onLocalStorageChange';

interface LocalStorageEvent {
  key: string;
  value: unknown;
}

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      let storageData: any = null;
      if (typeof window !== 'undefined') {
        storageData = localStorage.getItem('luugo');
      }
      return storageData ? JSON.parse(storageData) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key "${key}":', error);
      return initialValue;
    }
  });

  useEffect(() => {
    const handleStorageChange = (e: CustomEvent<LocalStorageEvent>) => {
      const {key: eventKey, value} = e.detail;
      if (eventKey === key) {
        setStoredValue(value as T);
      }
    };

    window.addEventListener(
      LOCAL_STORAGE_CHANGE_EVENT,
      handleStorageChange as EventListener
    );

    return () => {
      window.removeEventListener(
        LOCAL_STORAGE_CHANGE_EVENT,
        handleStorageChange as EventListener
      );
    };
  }, [key]);

  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));

      window.dispatchEvent(
        new CustomEvent<LocalStorageEvent>(LOCAL_STORAGE_CHANGE_EVENT, {
          detail: {
            key,
            value: valueToStore,
          },
        })
      );
    } catch (error) {
      console.error('Error setting localStorage key "${key}":', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;