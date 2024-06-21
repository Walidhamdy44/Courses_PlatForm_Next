import { useEffect, useState } from "react";

export function useDepunced<T>(value: T, delay?: number): T {
  const [dep, setDep] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDep(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return dep;
}
