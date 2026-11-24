import type { Post } from '../../types/post';
import { formatDate, getCategoryLabel } from '../../utils/format';
import Tag from '../common/Tag';
import * as S from './PostCard.styles';

interface PostCardProps {
  post: Post;
  showExcerpt?: boolean; // 내용 요약을 보여 줄지 (같은 카테고리 글 목록에서는 숨김)
}

export default function PostCard({ post, showExcerpt = true }: PostCardProps) {
  const { id, title, category, thumbnail, desc, username, regdate } = post;

  return (
    <S.Card>
      <S.CardLink to={`/posts/${id}`}>
        <S.Thumbnail>
          {thumbnail ? <img src={thumbnail} alt="" /> : <S.ThumbnailPlaceholder />}
        </S.Thumbnail>
        <Tag>{getCategoryLabel(category)}</Tag>
        <S.Title>{title}</S.Title>
        {showExcerpt && <S.Excerpt>{desc}</S.Excerpt>}
        <S.Meta>
          {username} · <time dateTime={regdate}>{formatDate(regdate)}</time>
        </S.Meta>
      </S.CardLink>
    </S.Card>
  );
}
