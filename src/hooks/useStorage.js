import { useEffect } from "react";

export function getValueFromSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export function getValueFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setValueToSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export default function useSessionStorage(key, value, setValue) {
  useEffect(() => {
    // setValue(value);
  }, [value]);
}
