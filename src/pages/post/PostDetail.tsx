import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deletePost } from '../../api/posts';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import Tag from '../../components/common/Tag';
import RelatedPosts from '../../components/post/RelatedPosts';
import { useAxios } from '../../hooks/useAxios';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToastStore } from '../../stores/useToastStore';
import type { Post } from '../../types/post';
import { formatDate, getCategoryLabel } from '../../utils/format';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const showToast = useToastStore((state) => state.showToast);

  // 데이터가 오기 전에는 글이 없으므로 초깃값은 null
  const { data: post, error, isLoading } = useAxios<Post | null>(`/posts/${id}`, null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) return <Spinner label="글을 불러오는 중이에요…" />;

  if (error || !post) {
    return (
      <EmptyState
        showIcon={false}
        title="글을 불러오지 못했어요"
        description={error || '글이 존재하지 않아요.'}
        action={<Button onClick={() => navigate('/')}>목록으로</Button>}
      />
    );
  }

  // 로그인한 사용자가 작성자일 때만 수정·삭제 버튼을 보여 준다
  const isAuthor = user?.email === post.author;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(post.id);
      showToast('글이 삭제되었어요.', 'success');
      navigate('/', { replace: true });
    } catch (e) {
      showToast(getErrorMessage(e), 'error');
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <article className={styles.article}>
        <Tag>{getCategoryLabel(post.category)}</Tag>
        <h2 className={styles.title}>{post.title}</h2>

        <div className={styles.meta}>
          <p className={styles.info}>
            {post.username} ·{' '}
            <time dateTime={post.regdate}>{formatDate(post.regdate)}</time>
          </p>
          {isAuthor && (
            <div className={styles.actions}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/posts/${post.id}/edit`)}
              >
                수정
              </Button>
              <Button size="sm" variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                삭제
              </Button>
            </div>
          )}
        </div>

        {post.thumbnail && (
          <img src={post.thumbnail} alt="" className={styles.cover} />
        )}
        <p className={styles.content}>{post.desc}</p>
      </article>

      <RelatedPosts postId={post.id} />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="게시글을 삭제할까요?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              취소
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? '삭제하는 중…' : '삭제'}
            </Button>
          </>
        }
      >
        삭제한 글은 다시 되돌릴 수 없어요.
      </Modal>
    </>
  );
}
