import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/ui/Chatbot';
import { HomePage } from './pages/HomePage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { ScrollToTop } from './components/ui/ScrollToTop';

import { BookingProvider } from './contexts/BookingContext';
import { BookingPopup } from './components/ui/BookingPopup';
import { AuthProvider } from './contexts/AuthContext';

import { AdminLogin } from './pages/Admin/AdminLogin';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function PublicLayout() {
  return (
    <div className="bg-white min-h-screen selection:bg-[var(--color-brand)] selection:text-white">
      <Header />
      <Outlet />
      <Chatbot />
      <BookingPopup />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/course/:id" element={<CourseDetailsPage />} />
            </Route>
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App
