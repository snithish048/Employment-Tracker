import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem("Data");
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("Data", JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
