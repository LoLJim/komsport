import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
        
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 bg-blue-600 rounded-md">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Компорт</span>
        </Link>

        {/* Правая часть (Меню + Кнопка) */}
        <div className="flex items-center ml-auto h-full gap-8">
          
          <nav className="hidden md:flex items-center h-full gap-6">
            <Link 
              to="/" 
              className={`h-full flex items-center border-b-2 transition-colors text-sm font-medium ${
                isActive('/') 
                  ? 'border-blue-600 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Главная
            </Link>
            <Link 
              to="/events" 
              className={`h-full flex items-center border-b-2 transition-colors text-sm font-medium ${
                isActive('/events') 
                  ? 'border-blue-600 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Мероприятия
            </Link>
            <Link 
              to="/tables" 
              className={`h-full flex items-center border-b-2 transition-colors text-sm font-medium ${
                isActive('/tables') 
                  ? 'border-blue-600 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Турнирные таблицы
            </Link>
          </nav>

          {/* Кнопка Войти */}
          <Link to="/login" className="px-5 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-50 rounded-md hover:bg-gray-100 border border-gray-200">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}