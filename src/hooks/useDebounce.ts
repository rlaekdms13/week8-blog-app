import { useEffect, useState } from 'react';

// value가 바뀐 뒤 delay(ms) 동안 다시 바뀌지 않으면 그 값을 돌려준다
export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // delay 안에 value가 또 바뀌면 이전 타이머를 취소한다
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
