import { useNavigate } from 'react-router';
import { createPost } from '../../api/posts';
import PostForm from '../../components/post/PostForm';
import { useToastStore } from '../../stores/useToastStore';
import type { PostFormValues } from '../../types/post';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './PostWrite.module.css';

export default function PostWrite() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (values: PostFormValues) => {
    // 유효성 검사를 통과했으므로 카테고리는 항상 있다. 타입을 좁히기 위해 한 번 더 확인한다
    if (!values.category) return;

    try {
      const post = await createPost({ ...values, category: values.category });
      showToast('글이 등록되었어요.', 'success');
      // 작성한 글의 상세 페이지로 이동 (뒤로 가기로 글쓰기 폼에 돌아오지 않게 replace)
      navigate(`/posts/${post.id}`, { replace: true });
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>새 글 작성</h2>
      <PostForm submitLabel="등록하기" onSubmit={handleSubmit} />
    </div>
  );
}
