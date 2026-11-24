# 끄적 블로그 (프론트엔드)

React + Vite + TypeScript로 만든 블로그 실습 프로젝트입니다.

## 기술 스택

| 구분      | 사용                                                                   |
| --------- | ---------------------------------------------------------------------- |
| 기본      | React 19, Vite, TypeScript                                             |
| 라우팅    | React Router                                                           |
| 전역 상태 | Zustand (persist)                                                      |
| API 통신  | Axios (인스턴스, 인터셉터)                                             |
| 스타일    | styled-components(컴포넌트), CSS Module(페이지), CSS 변수(디자인 토큰) |
| 기타      | date-fns, react-error-boundary                                         |

## 폴더 구조

```
src/
├─ api/          # Axios 인스턴스, API 함수
├─ assets/       # 아이콘, 이미지
├─ components/
│  ├─ common/    # 공통 UI (Button, Input, Modal, Toast, ...)
│  ├─ layout/    # Header, Footer
│  └─ post/      # 게시글 관련 컴포넌트
├─ hooks/        # useAxios, useDebounce
├─ layouts/      # RootLayout, AuthLayout, ProtectedRoute, GuestRoute
├─ pages/        # 페이지 + 페이지 CSS Module
├─ stores/       # Zustand 스토어 (인증, 토스트)
├─ styles/       # 디자인 토큰, 리셋, 글로벌 스타일
├─ types/        # 공통 타입
└─ utils/        # 유효성 검사, 포맷, 에러 메시지 등
```
