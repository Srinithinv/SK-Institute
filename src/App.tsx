import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/ui/Chatbot';
import { HomePage } from './pages/HomePage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { ScrollToTop } from './components/ui/ScrollToTop';

import { BookingProvider } from './contexts/BookingContext';
import { BookingPopup } from './components/ui/BookingPopup';

function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-white min-h-screen selection:bg-[var(--color-brand)] selection:text-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CourseDetailsPage />} />
          </Routes>
          <Chatbot />
          <BookingPopup />
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  )
}

export default App
