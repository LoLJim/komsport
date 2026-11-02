import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 relative">
      
      {/* Кнопка-крестик, которая ВСЕГДА ведет на главную */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-700 transition-colors"
        title="Вернуться на главную"
      >
        ✕
      </Link>

      {/* Карточка */}
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
        
        {/* Логотип */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Компорт</span>
        </div>

        {/* Заголовок */}
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Вход в систему</h1>
        <p className="mb-8 text-sm text-gray-500">
          Войдите, чтобы управлять командой, следить за турнирами и открывать новые возможности в Компорте.
        </p>

        {/* Форма (вернул тег <form>) */}
        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="name@company.ru" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Войти
          </button>
        </form>

        {/* Дополнительные ссылки */}
        <div className="flex flex-col items-center gap-4 mt-6 text-sm">
          <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">
            Забыли пароль?
          </Link>
          <div className="text-gray-500">
            Нет аккаунта? <Link to="/register" className="font-medium text-blue-600 hover:underline">Зарегистрироваться</Link>
          </div>
        </div>

      </div>
    </div>
  );
}