import { useId, useState, type ComponentProps } from 'react';
import eyeIcon from '../../assets/icons/eye.svg';
import eyeOffIcon from '../../assets/icons/eye-off.svg';
import * as S from './Input.styles';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  type = 'text',
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && isPasswordVisible ? 'text' : type;

  return (
    <S.Field>
      <S.Label htmlFor={inputId}>{label}</S.Label>
      <S.InputWrapper>
        <S.Input
          id={inputId}
          type={inputType}
          $hasError={Boolean(error)}
          $hasIcon={isPassword}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {isPassword && (
          <S.IconButton
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <img src={isPasswordVisible ? eyeOffIcon : eyeIcon} alt="" />
          </S.IconButton>
        )}
      </S.InputWrapper>
      {error && <S.ErrorMessage id={errorId}>{error}</S.ErrorMessage>}
    </S.Field>
  );
}
