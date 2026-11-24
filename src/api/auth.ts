import { axiosInstance } from './axiosInstance';
import type { MessageResponse } from '../types/api';
import type { AuthResponse, LoginRequest, SignupRequest } from '../types/auth';

// 회원가입: POST /register
export async function signup(body: SignupRequest) {
  const { data } = await axiosInstance.post<MessageResponse>('/register', body);
  return data;
}

// 로그인: POST /login
export async function login(body: LoginRequest) {
  const { data } = await axiosInstance.post<AuthResponse>('/login', body);
  return data;
}

// 로그아웃: POST /logout
export async function logout() {
  await axiosInstance.post('/logout');
}

// 액세스 토큰 재발급: POST /token
export async function reissueToken() {
  const { data } = await axiosInstance.post<AuthResponse>('/token');
  return data;
}
