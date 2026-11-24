import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router';
import ErrorFallback from '../components/common/ErrorFallback';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ToastContainer from '../components/common/Toast';
import * as S from './RootLayout.styles';

export default function RootLayout() {
  const { pathname } = useLocation();

  // 페이지(주소)가 바뀌면 스크롤을 맨 위로 올린다
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <S.Main>
        {/* 페이지에서 에러가 나도 헤더와 푸터는 그대로 두고 본문만 대체한다.
            주소가 바뀌면(resetKeys) 에러 상태를 초기화해 새 페이지를 다시 그린다. */}
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
          <Outlet />
        </ErrorBoundary>
      </S.Main>
      <Footer />
      <ToastContainer />
    </>
  );
}
