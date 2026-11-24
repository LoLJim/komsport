import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1a2233] text-white pt-12 pb-6 px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-10">
          {/* Левая часть (Логотип и описание) */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 font-bold bg-blue-600 rounded-md">A</div>
              <span className="text-xl font-bold tracking-wide">Компорт</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Портал для любительского спорта. Новости, турниры и результаты со всех уголков города.
            </p>
          </div>

          {/* Правая часть (Навигация) */}
          <div className="flex gap-16 md:gap-24">
            {/* Колонка "Сайт" */}
            <div>
              <h4 className="mb-4 font-semibold text-white">Сайт</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li><Link to="/" className="transition-colors hover:text-white">Главная</Link></li>
                <li><Link to="/events" className="transition-colors hover:text-white">Мероприятия</Link></li>
                <li><Link to="/tables" className="transition-colors hover:text-white">Турнирные таблицы</Link></li>
              </ul>
            </div>

            {/* Колонка "Сообщество"*/}
            <div>
              <h4 className="mb-4 font-semibold text-white">Сообщество</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li><Link to="/vacancies" className="transition-colors hover:text-white">Вакансии</Link></li>
                <li><Link to="/partners" className="transition-colors hover:text-white">Партнерам</Link></li>
                <li><Link to="/help" className="transition-colors hover:text-white">Помощь</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-700/50 mb-6" />

        <div className="flex flex-col justify-between text-xs text-gray-500 md:flex-row gap-4">
          <p>© 2026 Компорт. Все права защищены.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-gray-300">Политика конфиденциальности</Link>
            <Link to="/terms" className="transition-colors hover:text-gray-300">Пользовательское соглашение</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}