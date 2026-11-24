import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
import GuestRoute from './layouts/GuestRoute';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PostDetail from './pages/post/PostDetail';
import PostWrite from './pages/post/PostWrite';
import PostEdit from './pages/post/PostEdit';
import NotFound from './pages/not-found/NotFound';
import ComponentPreview from './pages/preview/ComponentPreview';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 누구나 */}
        <Route index element={<Home />} />
        <Route path="posts/:id" element={<PostDetail />} />

        {/* 로그인한 사용자만 */}
        <Route element={<ProtectedRoute />}>
          <Route path="write" element={<PostWrite />} />
          <Route path="posts/:id/edit" element={<PostEdit />} />
        </Route>

        {/* 로그인하지 않은 사용자만 */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>

        {import.meta.env.DEV && (
          <Route path="preview" element={<ComponentPreview />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
