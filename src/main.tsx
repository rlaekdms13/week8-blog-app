import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import ErrorFallback from './components/common/ErrorFallback.tsx';
import { restoreAuth } from './utils/restoreAuth.ts';
import './styles/global.css';

// 렌더링을 시작하기 전에 로그인 상태 복원을 시작한다 (기다리지 않는다)
restoreAuth();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 레이아웃(헤더 등)에서 난 에러까지 잡는 마지막 안전망 */}
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter useTransitions={false}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
