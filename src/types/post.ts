// 카테고리: 서버에 저장하는 값(value)과 화면에 보여 줄 이름(label)
export const CATEGORIES = [
  { value: 'Travel', label: '여행' },
  { value: 'Food', label: '음식' },
  { value: 'Life', label: '일상' },
] as const;

// 'Travel' | 'Food' | 'Life'
export type Category = (typeof CATEGORIES)[number]['value'];

// 게시글 (Swagger의 Post 스키마)
export interface Post {
  id: number;
  title: string;
  category: Category;
  username: string; // 작성자 이름
  author: string; // 작성자 이메일
  thumbnail: string | null; // Base64 Data URL, 없으면 null
  desc: string;
  regdate: string; // ISO 형식 날짜 문자열 (예: 2026-11-22T06:00:00.000Z)
}

// POST /posts 요청 본문: Post에서 사용자가 입력하는 값만 고른다
export type PostRequest = Pick<Post, 'title' | 'category' | 'thumbnail' | 'desc'>;

// PATCH /posts/:id 요청 본문: 바꿀 값만 보내므로 모든 속성이 선택
export type PostUpdateRequest = Partial<PostRequest>;

// 글쓰기 폼에서 다루는 값: 카테고리를 아직 고르지 않았으면 빈 문자열
export interface PostFormValues {
  title: string;
  category: Category | '';
  thumbnail: string | null;
  desc: string;
}
