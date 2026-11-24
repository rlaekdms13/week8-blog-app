// 로그인 폼에서 다루는 값
export interface LoginForm {
  email: string;
  password: string;
}

// 회원가입 폼에서 다루는 값
export interface SignupForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

// 폼 필드 이름을 키로, 에러 메시지를 값으로 갖는 객체 (모든 키는 선택)
export type FormErrors<T> = Partial<Record<keyof T, string>>;

// ----- API 요청·응답 타입 (Swagger 명세 기준) -----

// 로그인한 사용자 정보
export interface User {
  email: string;
  username: string;
}

// POST /login 요청 본문: 로그인 폼 값과 같다
export type LoginRequest = LoginForm;

// POST /register 요청 본문: 회원가입 폼 값에서 비밀번호 확인만 뺀다
export type SignupRequest = Omit<SignupForm, 'passwordConfirm'>;

// POST /login, POST /token 응답 본문
export interface AuthResponse {
  user: User;
  accessToken: string;
}
