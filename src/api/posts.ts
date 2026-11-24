import { axiosInstance } from './axiosInstance';
import type { Post, PostRequest, PostUpdateRequest } from '../types/post';

// 조회(GET)는 화면에서 useAxios 훅으로 요청하고,
// 생성·수정·삭제처럼 버튼을 눌렀을 때 보내는 요청은 API 함수로 만든다.

// 글 작성: POST /posts
export async function createPost(body: PostRequest) {
  const { data } = await axiosInstance.post<Post>('/posts', body);
  return data;
}

// 글 수정: PATCH /posts/:id
export async function updatePost(id: number, body: PostUpdateRequest) {
  const { data } = await axiosInstance.patch<Post>(`/posts/${id}`, body);
  return data;
}

// 글 삭제: DELETE /posts/:id
export async function deletePost(id: number) {
  await axiosInstance.delete(`/posts/${id}`);
}
