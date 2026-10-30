import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 relative">
      
      {/* Кнопка-крестик для возврата на главную */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-700 transition-colors z-10"
        title="Вернуться на главную"
      >
        ✕
      </Link>

      {/* Карточка */}
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-2xl shadow-sm relative">
        
        {/* Логотип */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Компорт</span>
        </div>

        {/* Заголовок */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Регистрация в системе</h1>
        <p className="mb-8 text-sm text-gray-500">
          Создайте аккаунт, чтобы участвовать в турнирах, управлять командой и открывать новые возможности в Компорте.
        </p>

        {/* Форма */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Имя</label>
              <input type="text" placeholder="Введите имя" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Фамилия</label>
              <input type="text" placeholder="Введите фамилию" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="name@company.ru" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Пароль</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Подтвердите пароль</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Роль</label>
            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none">
              <option value="participant">Участник</option>
              <option value="captain">Капитан команды</option>
              <option value="judge">Судья</option>
            </select>
          </div>

          {/* Чекбокс */}
          <div className="flex items-start gap-3 mt-2">
            <input type="checkbox" id="terms" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
              Согласен с правилами использования системы и обработкой персональных данных.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Войти в систему
          </Link>
        </div>

      </div>
    </div>
  );
}