import styled from 'styled-components';
import type { Post } from '../../types/post';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
  showExcerpt?: boolean;
}

export default function PostGrid({ posts, showExcerpt }: PostGridProps) {
  return (
    <Grid>
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} showExcerpt={showExcerpt} />
        </li>
      ))}
    </Grid>
  );
}

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-10) var(--space-6);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
`;
