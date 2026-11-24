import { useNavigate, useSearchParams } from 'react-router';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import PostGrid from '../../components/post/PostGrid';
import SearchBar from '../../components/post/SearchBar';
import { useAxios } from '../../hooks/useAxios';
import { useDebounce } from '../../hooks/useDebounce';
import type { Post } from '../../types/post';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  // 검색어는 URL의 쿼리스트링(?q=)에 둔다
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  // 입력할 때마다 요청하지 않도록, 입력이 0.3초 멈췄을 때의 검색어로 요청한다
  const debouncedQuery = useDebounce(query.trim(), 300);
  const url = debouncedQuery
    ? `/posts/search?title=${encodeURIComponent(debouncedQuery)}`
    : '/posts';
  const { data: posts, error, isLoading } = useAxios<Post[]>(url, []);

  const handleSearch = (value: string) => {
    // replace: 글자를 입력할 때마다 방문 기록이 쌓이지 않게 현재 기록을 바꾼다
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  const renderList = () => {
    if (isLoading) return <Spinner label="글을 불러오는 중이에요…" />;

    if (error) {
      return (
        <EmptyState
          showIcon={false}
          title="글을 불러오지 못했어요"
          description={error}
          action={
            <Button variant="secondary" onClick={() => navigate(0)}>
              다시 시도
            </Button>
          }
        />
      );
    }

    if (posts.length === 0) {
      return debouncedQuery ? (
        <EmptyState
          title="검색 결과가 없어요"
          description={`'${debouncedQuery}'(이)가 들어간 제목의 글이 없어요.`}
        />
      ) : (
        <EmptyState
          title="아직 작성된 글이 없어요"
          description="첫 번째 이야기를 기록해 보세요."
          action={<Button onClick={() => navigate('/write')}>글쓰기</Button>}
        />
      );
    }

    return <PostGrid posts={posts} />;
  };

  return (
    <>
      <section className={styles.hero}>
        <h2 className={styles.title}>생각을 가볍게, 끄적</h2>
        <p className={styles.description}>
          여행, 음식, 일상의 이야기를 자유롭게 기록해 보세요.
        </p>
        <SearchBar value={query} onChange={handleSearch} />
      </section>

      <section>
        <div className={styles.listHead}>
          <h3 className={styles.listTitle}>
            {debouncedQuery ? '검색 결과' : '최근 글'}
          </h3>
          {!isLoading && !error && (
            <span className={styles.count}>총 {posts.length}개</span>
          )}
        </div>
        {renderList()}
      </section>
    </>
  );
}
