import { reissueToken } from '../api/auth';
import { useAuthStore } from '../stores/useAuthStore';

// 새로고침 후 로그인 상태를 복원한다 (main.tsx에서 렌더링 전에 한 번 호출)
export async function restoreAuth() {
  const { user, setAuth, clearAuth, setAuthReady } = useAuthStore.getState();

  // 저장된 사용자 정보가 없으면 로그인한 적이 없으므로 복원할 것이 없다
  if (!user) {
    setAuthReady();
    return;
  }

  try {
    // 쿠키의 리프레시 토큰으로 새 액세스 토큰을 받는다
    const data = await reissueToken();
    setAuth(data.user, data.accessToken);
  } catch {
    // 리프레시 토큰이 없거나 만료되었다면 저장된 정보를 지운다
    clearAuth();
  } finally {
    setAuthReady();
  }
}
