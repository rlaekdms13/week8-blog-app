import { axiosInstance } from './axiosInstance';

export interface UserDetail {
  id: number;
  email: string;
  username: string;
}

// 내 정보 조회: GET /user (액세스 토큰 필요)
export async function getMe() {
  const { data } = await axiosInstance.get<UserDetail>('/user');
  return data;
}
