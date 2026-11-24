import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import type { AuthLocationState } from '../types/router';

// 로그인하지 않은 사용자만 들어갈 수 있는 라우트 (로그인, 회원가입)
export default function GuestRoute() {
  const user = useAuthStore((state) => state.user);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const location = useLocation();

  if (!isAuthReady) return null;

  if (user) {
    // 로그인했다면 원래 가려던 페이지(없으면 메인)로 보낸다
    const state = location.state as AuthLocationState | null;
    const redirectTo = state?.from?.pathname ?? '/';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
