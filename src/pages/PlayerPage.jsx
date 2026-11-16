import { useParams, useNavigate } from 'react-router-dom';

export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Имитация получения данных игрока из БД по его ID
  const playerData = {
    name: 'Иван Петров',
    role: 'Участник',
    age: 24,
    rank: 'КМС',
    team: 'Спартак-Арена',
    teamId: 1,
    avatar: '', 
    stats: [
      { label: "Игр сыграно", value: 12 },
      { label: "Голов", value: 7 },
      { label: "Побед", value: 8 },
      { label: "Наград", value: 3 },
    ],
    // ДОБАВИЛИ ИСТОРИЮ ТУРНИРОВ
    tournamentsHistory: [
      { id: 1, title: 'Кубок города по футболу', date: '18 окт 2026', place: '1 место', status: 'Завершен' },
      { id: 2, title: 'Осенний турнир по мини-футболу', date: '05 окт 2026', place: '3 место', status: 'Завершен' },
      { id: 3, title: 'Летний кубок', date: '12 авг 2026', place: 'Участник', status: 'Завершен' },
    ]
  };

  const getStatusColor = (status) => {
    if (status === 'Завершен') return 'bg-gray-100 text-gray-600';
    if (status === 'Идет') return 'bg-orange-50 text-orange-600';
    return 'bg-blue-50 text-blue-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Кнопка "Назад" */}
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline mb-6 inline-flex items-center gap-1">
          ← Вернуться назад
        </button>

        {/* Шапка профиля игрока */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          {playerData.avatar ? (
            <img src={playerData.avatar} alt="Avatar" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              <span className="text-4xl">👤</span>
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{playerData.name}</h1>
              <span className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md">
                {playerData.role}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4">
              <div>
                <span className="text-gray-400 mr-2">Возраст:</span>
                <span className="font-medium text-gray-900">{playerData.age} лет</span>
              </div>
              <div>
                <span className="text-gray-400 mr-2">Ранг:</span>
                <span className="font-medium text-gray-900">{playerData.rank}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-2">Команда:</span>
                <span className="font-medium text-gray-900">{playerData.team}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика игрока */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Личная статистика</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playerData.stats.map((stat, idx) => (
              <div key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col justify-center">
                <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* НОВЫЙ БЛОК: История турниров */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">История турниров</h2>
          <p className="text-sm text-gray-500 mb-4">Турниры, в которых игрок принимал участие</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="pb-3 font-medium">Дата</th>
                  <th className="pb-3 font-medium">Турнир</th>
                  <th className="pb-3 font-medium">Результат</th>
                  <th className="pb-3 font-medium text-right">Статус</th>
                </tr>
              </thead>
              <tbody>
                {playerData.tournamentsHistory.map((tour) => (
                  <tr key={tour.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-500">{tour.date}</td>
                    <td className="py-4 font-medium text-gray-900">{tour.title}</td>
                    <td className="py-4 text-sm text-gray-600">{tour.place}</td>
                    <td className="py-4 text-right">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(tour.status)}`}>
                        {tour.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}