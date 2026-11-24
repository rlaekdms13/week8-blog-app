import { useId, type ComponentProps } from 'react';
import * as S from './Textarea.styles';

interface TextareaProps extends ComponentProps<'textarea'> {
  label: string;
  error?: string;
}

export default function Textarea({ label, error, id, ...rest }: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <S.Field>
      <S.Label htmlFor={textareaId}>{label}</S.Label>
      <S.Textarea
        id={textareaId}
        $hasError={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && <S.ErrorMessage id={errorId}>{error}</S.ErrorMessage>}
    </S.Field>
  );
}
