import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { CATEGORIES, type PostFormValues } from '../../types/post';
import type { FormErrors } from '../../types/auth';
import { readFileAsDataURL, validateImageFile } from '../../utils/image';
import { hasErrors, validatePostForm } from '../../utils/validation';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import * as S from './PostForm.styles';

interface PostFormProps {
  initialValues?: PostFormValues;
  submitLabel: string;
  // 유효성 검사를 통과한 값을 받아 서버에 요청한다 (작성·수정 페이지가 정한다)
  onSubmit: (values: PostFormValues) => Promise<void>;
}

const EMPTY_FORM: PostFormValues = {
  title: '',
  category: '',
  thumbnail: null,
  desc: '',
};

// 글쓰기와 글 수정 페이지가 함께 쓰는 폼
export default function PostForm({
  initialValues = EMPTY_FORM,
  submitLabel,
  onSubmit,
}: PostFormProps) {
  const [form, setForm] = useState<PostFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<PostFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageSelect = async (file: File) => {
    const imageError = validateImageFile(file);
    if (imageError) {
      setErrors((prev) => ({ ...prev, thumbnail: imageError }));
      return;
    }
    try {
      const dataURL = await readFileAsDataURL(file);
      setForm((prev) => ({ ...prev, thumbnail: dataURL }));
      setErrors((prev) => ({ ...prev, thumbnail: undefined }));
    } catch (error) {
      const message = error instanceof Error ? error.message : '이미지를 읽지 못했어요.';
      setErrors((prev) => ({ ...prev, thumbnail: message }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validatePostForm(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ ...form, title: form.title.trim() });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit} noValidate>
      <S.Row>
        <Input
          label="제목"
          name="title"
          placeholder="제목을 입력해 주세요"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          maxLength={50}
        />
        <Select
          label="카테고리"
          name="category"
          placeholder="카테고리 선택"
          options={CATEGORIES}
          value={form.category}
          onChange={handleChange}
          error={errors.category}
        />
      </S.Row>

      <ImageUpload
        label="썸네일 (선택)"
        value={form.thumbnail}
        onSelect={handleImageSelect}
        onRemove={() => setForm((prev) => ({ ...prev, thumbnail: null }))}
        error={errors.thumbnail}
      />

      <Textarea
        label="내용"
        name="desc"
        placeholder="내용을 입력해 주세요"
        value={form.desc}
        onChange={handleChange}
        error={errors.desc}
      />

      <S.Actions>
        <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? '저장하는 중…' : submitLabel}
        </Button>
      </S.Actions>
    </S.Form>
  );
}
