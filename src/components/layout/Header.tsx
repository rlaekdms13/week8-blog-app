import { useNavigate } from 'react-router';
import { logout } from '../../api/auth';
import logoMark from '../../assets/images/logo-mark.svg';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToastStore } from '../../stores/useToastStore';
import Button from '../common/Button';
import * as S from './Header.styles';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // 서버 요청이 실패해도 화면에서는 로그아웃 상태로 만든다
    } finally {
      // 메인으로 먼저 이동한 뒤 로그인 정보를 지운다
      navigate('/', { replace: true });
      clearAuth();
      showToast('로그아웃되었어요.');
    }
  };

  return (
    <S.Header>
      <S.Inner>
        <h1>
          <S.Logo to="/">
            <img src={logoMark} alt="" width={28} height={28} />
            <span>끄적</span>
          </S.Logo>
        </h1>
        <S.Nav>
          <S.NavLink to="/write">글쓰기</S.NavLink>
          {user ? (
            <>
              <S.UserName>
                <strong>{user.username}</strong>님
              </S.UserName>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <S.LoginLink to="/login">로그인</S.LoginLink>
          )}
        </S.Nav>
      </S.Inner>
    </S.Header>
  );
}
