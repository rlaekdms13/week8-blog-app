import type { Location } from 'react-router';

// navigate()의 state로 주고받는 값
export interface AuthLocationState {
  from?: Location; // 로그인 후 돌아갈 페이지
  email?: string; // 회원가입 후 로그인 폼에 미리 채울 이메일
}
