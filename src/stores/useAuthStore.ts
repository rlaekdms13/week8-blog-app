import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  // 새로고침 후 로그인 상태 복원(토큰 재발급)이 끝났는지
  isAuthReady: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setAuthReady: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthReady: false,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
      setAuthReady: () => set({ isAuthReady: true }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장할 키 이름
      // 액세스 토큰은 저장하지 않고 user만 저장한다
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
