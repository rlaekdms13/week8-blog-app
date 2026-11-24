import { useNavigate, useParams } from 'react-router';
import { updatePost } from '../../api/posts';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import PostForm from '../../components/post/PostForm';
import { useAxios } from '../../hooks/useAxios';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToastStore } from '../../stores/useToastStore';
import type { Post, PostFormValues } from '../../types/post';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './PostWrite.module.css';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const showToast = useToastStore((state) => state.showToast);

  // 수정할 글의 기존 내용을 불러온다
  const { data: post, error, isLoading } = useAxios<Post | null>(`/posts/${id}`, null);

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

  // 주소를 직접 입력해 들어온 경우에도 작성자가 아니면 폼을 보여 주지 않는다
  if (user?.email !== post.author) {
    return (
      <EmptyState
        showIcon={false}
        title="수정 권한이 없어요"
        description="본인이 작성한 글만 수정할 수 있어요."
        action={<Button onClick={() => navigate(`/posts/${post.id}`)}>글로 돌아가기</Button>}
      />
    );
  }

  const initialValues: PostFormValues = {
    title: post.title,
    category: post.category,
    thumbnail: post.thumbnail,
    desc: post.desc,
  };

  const handleSubmit = async (values: PostFormValues) => {
    if (!values.category) return;

    try {
      await updatePost(post.id, { ...values, category: values.category });
      showToast('글이 수정되었어요.', 'success');
      navigate(`/posts/${post.id}`, { replace: true });
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>글 수정</h2>
      <PostForm
        initialValues={initialValues}
        submitLabel="수정하기"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
