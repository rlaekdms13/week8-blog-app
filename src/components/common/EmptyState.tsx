import type { ReactNode } from 'react';
import documentIcon from '../../assets/icons/document.svg';
import * as S from './EmptyState.styles';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode; // 버튼 등 안내 아래에 보여 줄 요소
  showIcon?: boolean;
}

// 빈 목록, 에러, 404처럼 "보여 줄 내용이 없을 때" 쓰는 안내 컴포넌트
export default function EmptyState({
  title,
  description,
  action,
  showIcon = true,
}: EmptyStateProps) {
  return (
    <S.Wrapper>
      {showIcon && <img src={documentIcon} alt="" width={40} height={40} />}
      <S.Title>{title}</S.Title>
      {description && <S.Description>{description}</S.Description>}
      {action && <S.Action>{action}</S.Action>}
    </S.Wrapper>
  );
}
