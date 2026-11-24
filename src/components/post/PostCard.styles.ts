import { Link } from 'react-router';
import styled from 'styled-components';

export const Card = styled.article``;

export const Thumbnail = styled.div`
  aspect-ratio: 16 / 10;
  margin-bottom: var(--space-4);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--color-bg-muted);
  transition: box-shadow 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 썸네일이 없는 글에 보여 줄 기본 배경
export const ThumbnailPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--color-indigo-100) 0%,
    var(--color-indigo-50) 100%
  );
`;

export const Title = styled.h3`
  display: -webkit-box;
  margin: var(--space-2) 0;
  overflow: hidden;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  transition: color 0.2s;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Excerpt = styled.p`
  display: -webkit-box;
  margin-bottom: var(--space-3);
  overflow: hidden;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Meta = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
`;

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;

  &:hover ${Title} {
    color: var(--color-primary);
  }

  &:hover ${Thumbnail} {
    box-shadow: var(--shadow-md);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
    border-radius: var(--radius-lg);
  }
`;
