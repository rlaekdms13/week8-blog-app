import { Navigate, Outlet, useLocation } from 'react-router';
import Spinner from '../components/common/Spinner';
import { useAuthStore } from '../stores/useAuthStore';
import type { AuthLocationState } from '../types/router';

// 로그인한 사용자만 들어갈 수 있는 라우트
export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const location = useLocation();

  // 로그인 상태를 복원하는 중이면 판단을 미룬다
  if (!isAuthReady) return <Spinner label="로그인 정보를 확인하는 중이에요…" />;

  if (!user) {
    // 로그인 페이지로 보내면서, 로그인 후 돌아올 위치를 state로 넘긴다
    const state: AuthLocationState = { from: location };
    return <Navigate to="/login" replace state={state} />;
  }

  return <Outlet />;
}
