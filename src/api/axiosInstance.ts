import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import type { AuthResponse } from '../types/auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 다른 출처(서버)와 쿠키를 주고받는다
});

// ----- 요청 인터셉터: 모든 요청에 액세스 토큰을 붙인다 -----
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ----- 응답 인터셉터: 액세스 토큰이 만료되면 재발급받고 다시 요청한다 -----

// 재발급 요청이 진행 중이면 그 Promise를 저장해 둔다
// (여러 요청이 동시에 401을 받아도 재발급은 한 번만 보내기 위해서)
let refreshPromise: Promise<string> | null = null;

async function reissueAccessToken(): Promise<string> {
  // 인터셉터를 거치지 않도록 axiosInstance가 아니라 axios로 직접 요청한다
  const { data } = await axios.post<AuthResponse>(
    `${import.meta.env.VITE_API_URL}/token`,
    null,
    { withCredentials: true },
  );
  useAuthStore.getState().setAuth(data.user, data.accessToken);
  return data.accessToken;
}

// 재시도 여부를 표시하기 위해 요청 설정 타입에 _retry를 추가한다
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error) || !error.config) {
      return Promise.reject(error);
    }

    const originalRequest: RetryConfig = error.config;
    const isUnauthorized = error.response?.status === 401;
    const hasToken = Boolean(useAuthStore.getState().accessToken);

    // 토큰을 가지고 보낸 요청이 401을 받았고, 아직 재시도하지 않았다면 재발급한다
    if (isUnauthorized && hasToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        refreshPromise ??= reissueAccessToken().finally(() => {
          refreshPromise = null;
        });
        const newAccessToken = await refreshPromise;

        // 새 토큰으로 원래 요청을 다시 보낸다
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었다면 로그아웃 처리한다
        useAuthStore.getState().clearAuth();
        useToastStore
          .getState()
          .showToast('로그인이 만료되었어요. 다시 로그인해 주세요.', 'error');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
