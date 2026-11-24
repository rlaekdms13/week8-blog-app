import { useId, type ComponentProps } from 'react';
import chevronIcon from '../../assets/icons/chevron-down.svg';
import * as S from './Select.styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ComponentProps<'select'> {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  error?: string;
}

export default function Select({
  label,
  options,
  placeholder,
  error,
  id,
  value,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;

  return (
    <S.Field>
      <S.Label htmlFor={selectId}>{label}</S.Label>
      <S.SelectWrapper>
        <S.Select
          id={selectId}
          value={value}
          $hasError={Boolean(error)}
          $isPlaceholder={value === ''}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.Select>
        <S.Arrow src={chevronIcon} alt="" />
      </S.SelectWrapper>
      {error && <S.ErrorMessage id={errorId}>{error}</S.ErrorMessage>}
    </S.Field>
  );
}
