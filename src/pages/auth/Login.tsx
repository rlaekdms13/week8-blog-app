import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLocation } from 'react-router';
import { login } from '../../api/auth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToastStore } from '../../stores/useToastStore';
import type { FormErrors, LoginForm } from '../../types/auth';
import type { AuthLocationState } from '../../types/router';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { hasErrors, validateLoginForm } from '../../utils/validation';
import styles from './Auth.module.css';

export default function Login() {
  const location = useLocation();
  const locationState = location.state as AuthLocationState | null;

  // 회원가입 직후라면 가입한 이메일을 미리 채운다
  const [form, setForm] = useState<LoginForm>({
    email: locationState?.email ?? '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors<LoginForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useToastStore((state) => state.showToast);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      const { user, accessToken } = await login(form);
      // 전역 상태에 저장하면 GuestRoute가 원래 가려던 페이지로 이동시킨다
      setAuth(user, accessToken);
      showToast(`${user.username}님, 환영해요!`, 'success');
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.heading}>
        <h2 className={styles.title}>로그인</h2>
        <p className={styles.description}>끄적에 다시 오신 것을 환영해요.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="이메일"
          type="email"
          name="email"
          placeholder="example@email.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoFocus={Boolean(locationState?.email)}
        />
        <Button
          type="submit"
          size="lg"
          fullWidth
          className={styles.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '로그인 중…' : '로그인'}
        </Button>
      </form>
    </>
  );
}
