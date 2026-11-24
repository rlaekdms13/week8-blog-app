import { useNavigate } from 'react-router';
import Button from '../../components/common/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h2 className={styles.title}>페이지를 찾을 수 없어요</h2>
      <p className={styles.description}>
        주소가 잘못되었거나 삭제된 페이지예요.
      </p>
      <Button size="lg" onClick={() => navigate('/')}>
        홈으로 돌아가기
      </Button>
    </section>
  );
}
