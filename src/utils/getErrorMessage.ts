import axios from 'axios';
import type { MessageResponse } from '../types/api';

// catch로 받은 에러에서 사용자에게 보여 줄 메시지를 꺼낸다
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<MessageResponse>(error)) {
    // 서버가 응답했다면 서버의 메시지를 쓴다
    if (error.response) {
      return error.response.data?.message ?? '요청을 처리하지 못했어요.';
    }
    // 응답 자체가 없다면 서버가 꺼져 있거나 네트워크 문제다
    return '서버에 연결할 수 없어요. 잠시 후 다시 시도해 주세요.';
  }
  if (error instanceof Error) return error.message;
  return '알 수 없는 오류가 발생했어요.';
}
