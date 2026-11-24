import styled from 'styled-components';
import { useAxios } from '../../hooks/useAxios';
import type { Post } from '../../types/post';
import PostGrid from './PostGrid';

interface RelatedPostsProps {
  postId: number;
}

// 같은 카테고리의 다른 글 (상세 페이지 아래)
export default function RelatedPosts({ postId }: RelatedPostsProps) {
  const { data: posts, error, isLoading } = useAxios<Post[]>(
    `/posts/${postId}/related`,
    [],
  );

  // 부가 정보이므로 불러오는 중이거나, 실패했거나, 글이 없으면 영역 자체를 숨긴다
  if (isLoading || error || posts.length === 0) return null;

  return (
    <Section>
      <Title>같은 카테고리의 글</Title>
      <PostGrid posts={posts.slice(0, 3)} showExcerpt={false} />
    </Section>
  );
}

const Section = styled.section`
  margin-top: var(--space-16);
  padding-top: var(--space-10);
  border-top: 1px solid var(--color-border);
`;

const Title = styled.h3`
  margin-bottom: var(--space-6);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
`;
