import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Восстановление пароля</h2>
        <p className="mb-6 text-sm text-gray-500">Функция смены пароля находится в разработке.</p>
        <Link to="/login" className="font-medium text-blue-600 hover:underline">Вернуться ко входу</Link>
      </div>
    </div>
  );
}