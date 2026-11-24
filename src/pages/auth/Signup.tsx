import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../../api/auth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToastStore } from '../../stores/useToastStore';
import type { FormErrors, SignupForm } from '../../types/auth';
import type { AuthLocationState } from '../../types/router';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { hasErrors, validateSignupForm } from '../../utils/validation';
import styles from './Auth.module.css';

const initialForm: SignupForm = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

export default function Signup() {
  const [form, setForm] = useState<SignupForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors<SignupForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateSignupForm(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      // 서버에는 비밀번호 확인 값을 보내지 않는다
      const { email, username, password } = form;
      await signup({ email, username: username.trim(), password });

      showToast('회원가입이 완료되었어요. 로그인해 주세요.', 'success');
      // 로그인 페이지로 이동하면서 가입한 이메일을 넘긴다
      const state: AuthLocationState = { email };
      navigate('/login', { state });
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.heading}>
        <h2 className={styles.title}>회원가입</h2>
        <p className={styles.description}>
          간단한 정보만 입력하면 바로 시작할 수 있어요.
        </p>
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
          label="이름"
          name="username"
          placeholder="2~10자로 입력해 주세요"
          autoComplete="nickname"
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          label="비밀번호"
          type="password"
          name="password"
          placeholder="8자 이상 입력해 주세요"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          autoComplete="new-password"
          value={form.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />
        <Button
          type="submit"
          size="lg"
          fullWidth
          className={styles.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '가입하는 중…' : '회원가입'}
        </Button>
      </form>
    </>
  );
}
