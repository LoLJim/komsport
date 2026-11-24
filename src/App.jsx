import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import InDevelopment from './pages/InDevelopment';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Events from './pages/Events';
import TeamPage from './pages/TeamPage';
import PlayerPage from './pages/PlayerPage';
import JudgePanel from './pages/JudgePanel';

function LayoutWithHeader() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<><ScrollToTop /><Login /></>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
        <Route path="/judge" element={<JudgePanel />} />

        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tables" element={<InDevelopment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;