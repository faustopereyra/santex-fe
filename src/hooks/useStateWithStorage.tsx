import { useState } from 'react';

function useStateWithStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;

  const [value, setValue] = useState<T>(initialValue);

  function setValueAndStore(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, setValueAndStore];
}

export default useStateWithStorage;
