import * as S from './Spinner.styles';

interface SpinnerProps {
  label?: string;
}

export default function Spinner({ label = '불러오는 중이에요…' }: SpinnerProps) {
  return (
    <S.Wrapper role="status">
      <S.Circle />
      <S.Label>{label}</S.Label>
    </S.Wrapper>
  );
}
