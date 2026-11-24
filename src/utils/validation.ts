import type { FormErrors, LoginForm, SignupForm } from '../types/auth';
import type { PostFormValues } from '../types/post';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

export function validateLoginForm(form: LoginForm): FormErrors<LoginForm> {
  const errors: FormErrors<LoginForm> = {};

  if (!form.email.trim()) {
    errors.email = '이메일을 입력해 주세요.';
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = '올바른 이메일 형식이 아니에요.';
  }

  if (!form.password) {
    errors.password = '비밀번호를 입력해 주세요.';
  }

  return errors;
}

export function validateSignupForm(form: SignupForm): FormErrors<SignupForm> {
  const errors: FormErrors<SignupForm> = {};
  const username = form.username.trim();

  if (!form.email.trim()) {
    errors.email = '이메일을 입력해 주세요.';
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = '올바른 이메일 형식이 아니에요.';
  }

  if (!username) {
    errors.username = '이름을 입력해 주세요.';
  } else if (username.length < 2 || username.length > 10) {
    errors.username = '이름은 2~10자로 입력해 주세요.';
  }

  if (!form.password) {
    errors.password = '비밀번호를 입력해 주세요.';
  } else if (form.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 해요.`;
  }

  if (!form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호를 한 번 더 입력해 주세요.';
  } else if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않아요.';
  }

  return errors;
}

// 에러 객체에 메시지가 하나라도 있는지 확인
export function hasErrors<T>(errors: FormErrors<T>): boolean {
  return Object.values(errors).some(Boolean);
}

const TITLE_MAX_LENGTH = 50;
const DESC_MIN_LENGTH = 10;

export function validatePostForm(form: PostFormValues): FormErrors<PostFormValues> {
  const errors: FormErrors<PostFormValues> = {};
  const title = form.title.trim();

  if (!title) {
    errors.title = '제목을 입력해 주세요.';
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `제목은 ${TITLE_MAX_LENGTH}자 이하로 입력해 주세요.`;
  }

  if (!form.category) {
    errors.category = '카테고리를 선택해 주세요.';
  }

  if (form.desc.trim().length < DESC_MIN_LENGTH) {
    errors.desc = `내용을 ${DESC_MIN_LENGTH}자 이상 입력해 주세요.`;
  }

  return errors;
}
