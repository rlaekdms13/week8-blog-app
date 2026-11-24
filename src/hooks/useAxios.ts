import axios from 'axios';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { getErrorMessage } from '../utils/getErrorMessage';

// url로 GET 요청을 보내고 data, error, isLoading을 관리하는 커스텀 훅
export function useAxios<T>(url: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      // url이 바뀌어 다시 요청할 때마다 상태를 초기화한다
      setIsLoading(true);
      setError('');
      try {
        const response = await axiosInstance.get<T>(url, {
          signal: controller.signal,
        });
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        // 요청을 취소한 경우(다른 url로 바뀜, 언마운트)는 무시한다
        if (axios.isCancel(e)) return;
        setError(getErrorMessage(e));
        setIsLoading(false);
      }
    };

    fetchData();

    // 이전 요청이 끝나기 전에 url이 바뀌거나 컴포넌트가 사라지면 요청을 취소한다
    return () => controller.abort();
  }, [url]);

  return { data, error, isLoading };
}
