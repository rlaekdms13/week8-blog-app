import { Outlet } from 'react-router';
import * as S from './AuthLayout.styles';

export default function AuthLayout() {
  return (
    <S.Wrapper>
      <S.Card>
        <S.Tabs>
          <S.Tab to="/login">로그인</S.Tab>
          <S.Tab to="/signup">회원가입</S.Tab>
        </S.Tabs>
        <Outlet />
      </S.Card>
    </S.Wrapper>
  );
}
