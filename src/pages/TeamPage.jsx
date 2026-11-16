import { useParams, useNavigate } from 'react-router-dom'; // Заменили Link на useNavigate

export default function TeamPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Хук для навигации

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  const teamDetails = {
    name: 'Спартак-Арена',
    subtitle: 'Любительский футбольный клуб. Москва.',
    players: [
      { id: 1, name: 'Иван Петров', role: 'Вратарь', number: 1, avatar: 'ИП' },
      { id: 2, name: 'Сергей Кузнецов', role: 'Центральный защитник', number: 4, avatar: 'СК' },
      { id: 3, name: 'Дмитрий Смирнов', role: 'Левый полузащитник', number: 7, avatar: 'ДС' },
      { id: 4, name: 'Антон Волков', role: 'Центральный полузащитник', number: 10, avatar: 'АВ' },
      { id: 5, name: 'Никита Орлов', role: 'Правый нападающий', number: 11, avatar: 'НО' },
    ],
    history: [
      { id: 1, date: '12 окт', opponent: 'Динамо-Юниор', score: '2:1', result: 'Победа' },
      { id: 2, date: '05 окт', opponent: 'Локомотив-2', score: '1:1', result: 'Ничья' },
      { id: 3, date: '28 сен', opponent: 'Спартак-Юниор', score: '0:3', result: 'Поражение' },
    ]
  };

  const getResultColor = (result) => {
    if (result === 'Победа') return 'bg-green-100 text-green-700';
    if (result === 'Ничья') return 'bg-gray-100 text-gray-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* ИСПРАВЛЕНО: Кнопка "Назад" теперь возвращает историю */}
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline mb-6 inline-flex items-center gap-1">
          ← Вернуться назад
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold">
              🛡️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{teamDetails.name}</h1>
              <p className="text-sm text-gray-500">{teamDetails.subtitle}</p>
            </div>
          </div>
          
          {isAdmin && (
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Подать заявку</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Добавить игрока</button>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Состав команды</h2>
              <p className="text-sm text-gray-500">Заявленные игроки на текущий сезон</p>
            </div>
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              {teamDetails.players.length} игроков
            </span>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="pb-3 font-medium w-1/2">Игрок</th>
                <th className="pb-3 font-medium text-center">№</th>
                <th className="pb-3 font-medium">Позиция</th>
                {isAdmin && <th className="pb-3 font-medium text-right">Действия</th>}
              </tr>
            </thead>
            <tbody>
              {teamDetails.players.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {p.avatar}
                    </div>
                    <p className="font-medium text-gray-900">{p.name}</p>
                  </td>
                  <td className="py-3 text-center text-sm text-gray-900 font-bold">{p.number}</td>
                  <td className="py-3 text-sm text-gray-500">{p.role}</td>
                  {isAdmin && (
                    <td className="py-3 text-right">
                      <button className="text-blue-500 hover:text-blue-700 mr-3">✏️</button>
                      <button className="text-red-500 hover:text-red-700">🗑️</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Последние матчи</h2>
          <p className="text-sm text-gray-500 mb-4">История выступлений команды</p>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="pb-3 font-medium">Дата</th>
                <th className="pb-3 font-medium">Соперник</th>
                <th className="pb-3 font-medium text-center">Счёт</th>
                <th className="pb-3 font-medium text-right">Результат</th>
              </tr>
            </thead>
            <tbody>
              {teamDetails.history.map((h) => (
                <tr key={h.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 text-sm text-gray-500">{h.date}</td>
                  <td className="py-4 font-medium text-gray-900">{h.opponent}</td>
                  <td className="py-4 text-sm font-bold text-gray-900 text-center">{h.score}</td>
                  <td className="py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getResultColor(h.result)}`}>{h.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}