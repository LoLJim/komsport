import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import InDevelopment from './pages/InDevelopment';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';

// Вспомогательный компонент для страниц, где НУЖНЫ Header и Footer
function LayoutWithHeader() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Сюда подставляются страницы */}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. СТРАНИЦЫ БЕЗ ШАПКИ И ПОДВАЛА (голые) */}
        {/* Добавляем ScrollToTop, чтобы при переходе на логин страница прокручивалась вверх */}
        <Route path="/login" element={<><ScrollToTop /><Login /></>} />
        <Route path="/register" element={<><ScrollToTop /><Register /></>} />
        <Route path="/forgot-password" element={<><ScrollToTop /><ForgotPassword /></>} />
        <Route path="/profile" element={<Profile />} />
        
        {/* 2. СТРАНИЦЫ С ШАПКОЙ И ПОДВАЛОМ */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<InDevelopment />} />
          <Route path="/tables" element={<InDevelopment />} />
          <Route path="/contacts" element={<InDevelopment />} />
          <Route path="/vacancies" element={<InDevelopment />} />
          <Route path="/partners" element={<InDevelopment />} />
          <Route path="/help" element={<InDevelopment />} />
          <Route path="/privacy" element={<InDevelopment />} />
          <Route path="/terms" element={<InDevelopment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;