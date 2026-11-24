import type { FallbackProps } from 'react-error-boundary';
import Button from './Button';
import EmptyState from './EmptyState';

// 렌더링 중 에러가 났을 때 ErrorBoundary가 대신 보여 주는 화면
export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <EmptyState
      showIcon={false}
      title="화면을 표시하는 중 문제가 생겼어요"
      description="잠시 후 다시 시도해 주세요. 문제가 계속되면 새로고침해 주세요."
      action={<Button onClick={resetErrorBoundary}>다시 시도</Button>}
    />
  );
}
