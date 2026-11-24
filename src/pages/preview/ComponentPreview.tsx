import { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import { getMe } from '../../api/user';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useToastStore } from '../../stores/useToastStore';
import styles from './ComponentPreview.module.css';

// 개발 중에 공통 컴포넌트를 한눈에 확인하는 페이지
export default function ComponentPreview() {
  const showToast = useToastStore((state) => state.showToast);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 인증이 필요한 API(GET /user)를 호출해 토큰 재발급 흐름을 확인한다
  const handleCheckMe = async () => {
    try {
      const me = await getMe();
      showToast(`인증 확인: ${me.username} (${me.email})`, 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <>
      <h2 className={styles.title}>공통 컴포넌트 미리보기</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Button</h3>
        <div className={styles.row}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className={styles.row} style={{ marginTop: 'var(--space-3)' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Input</h3>
        <div className={styles.inputs}>
          <Input label="기본" placeholder="내용을 입력해 주세요" />
          <Input label="비밀번호" type="password" defaultValue="password" />
          <Input
            label="에러"
            defaultValue="wrong-email"
            error="올바른 이메일 형식이 아니에요."
          />
          <Input label="비활성" defaultValue="수정할 수 없어요" disabled />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Toast</h3>
        <div className={styles.row}>
          <Button
            variant="secondary"
            onClick={() => showToast('저장되었어요.', 'success')}
          >
            Success
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToast('요청에 실패했어요.', 'error')}
          >
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToast('로그인이 필요해요.')}
          >
            Info
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Modal</h3>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          모달 열기
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="게시글을 삭제할까요?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button variant="danger" onClick={() => setIsModalOpen(false)}>
                삭제
              </Button>
            </>
          }
        >
          삭제한 글은 다시 되돌릴 수 없어요.
        </Modal>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Spinner</h3>
        <Spinner />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>인증 API 확인 (GET /user)</h3>
        <Button variant="secondary" onClick={handleCheckMe}>
          내 정보 요청하기
        </Button>
      </section>
    </>
  );
}
