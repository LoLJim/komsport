import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  // ================= СОСТОЯНИЯ =================
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Состояние для модального окна создания турнира
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Состояние для выбранной команды (для детального просмотра)
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Поиск
  const [userSearch, setUserSearch] = useState('');
  const [judgeSearch, setJudgeSearch] = useState('');
  const [teamSearch, setTeamSearch] = useState('');

  // ================= МОКОВЫЕ ДАННЫЕ =================
  const stats = { users: 1247, activeTournaments: 8, matchesToday: 12, judges: 24 };

  const [tournaments, setTournaments] = useState([
    { id: 1, title: 'Кубок города по футболу', date: '18 окт', status: 'Скоро', participants: 12 },
    { id: 2, title: 'Открытый турнир по баскетболу', date: '12 окт', status: 'Идет', participants: 8 },
    { id: 3, title: 'Межмуниципальный турнир по волейболу', date: '05 окт', status: 'Завершен', participants: 10 },
    { id: 4, title: 'Осенний турнир по мини-футболу', date: '21 окт', status: 'Скоро', participants: 14 },
    { id: 5, title: 'Кубок региона по настольному теннису', date: '28 окт', status: 'Скоро', participants: 6 },
  ]);

  const users = [
    { id: 1, name: 'Иван Петров', email: 'ivan@mail.ru', role: 'Участник', status: 'Активен' },
    { id: 2, name: 'Сергей Кузнецов', email: 'sergey@mail.ru', role: 'Капитан', status: 'Активен' },
    { id: 3, name: 'Дмитрий Смирнов', email: 'dmitry@mail.ru', role: 'Участник', status: 'Заблокирован' },
    { id: 4, name: 'Антон Волков', email: 'anton@mail.ru', role: 'Участник', status: 'Активен' },
  ];

  const judges = [
    { id: 1, name: 'Алексей Иванов', category: 'Высшая', matches: 45 },
    { id: 2, name: 'Мария Смирнова', category: 'Первая', matches: 32 },
    { id: 3, name: 'Олег Дмитриев', category: 'Высшая', matches: 60 },
  ];

  const teams = [
    { id: 1, name: 'Спартак-Арена', city: 'Москва', players: 5 },
    { id: 2, name: 'Динамо', city: 'Москва', players: 12 },
    { id: 3, name: 'ФК Юность', city: 'Санкт-Петербург', players: 18 },
  ];

  // Детальные данные для выбранной команды (как на изображении 2)
  const teamDetails = {
    name: 'Спартак-Арена',
    subtitle: 'Управление составом, заявками и историей выступлений',
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

  // ================= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =================
  const getStatusColor = (status) => {
    if (status === 'Скоро') return 'bg-blue-50 text-blue-600';
    if (status === 'Идет') return 'bg-orange-50 text-orange-600';
    if (status === 'Завершен') return 'bg-gray-100 text-gray-600';
    if (status === 'Заблокирован') return 'bg-red-50 text-red-600';
    return 'bg-green-50 text-green-600';
  };

  const getResultColor = (result) => {
    if (result === 'Победа') return 'bg-green-100 text-green-700';
    if (result === 'Ничья') return 'bg-gray-100 text-gray-700';
    return 'bg-red-100 text-red-700';
  };

  // Обработчик создания турнира (демо)
  const handleCreateTournament = (e) => {
    e.preventDefault();
    const newTour = {
      id: Date.now(),
      title: e.target.title.value,
      date: e.target.date.value || 'Скоро',
      status: 'Скоро',
      participants: 0,
    };
    setTournaments([newTour, ...tournaments]);
    setIsModalOpen(false);
  };

  const handleDeleteTournament = (id) => {
    if (window.confirm('Удалить турнир?')) {
      setTournaments(tournaments.filter(t => t.id !== id));
    }
  };

  // ================= МЕНЮ =================
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: '📊' },
    { id: 'tournaments', label: 'Турниры', icon: '🏆' },
    { id: 'users', label: 'Пользователи', icon: '👥' },
    { id: 'judges', label: 'Судьи', icon: '⚖️' },
    { id: 'teams', label: 'Команды', icon: '🛡️' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  // ================= РЕНДЕР КОМПОНЕНТА =================
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* БОКОВОЕ МЕНЮ */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 bg-blue-600 rounded-md">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Компорт</span>
            </Link>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white bg-gray-800 rounded-full">
                АД
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Администратор</h3>
                <p className="text-xs text-gray-500">Полный доступ</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSelectedTeam(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <span>↩</span> Выйти
          </Link>
        </div>
      </aside>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* ================= 1. ДАШБОРД ================= */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Админ-панель</h1>
              <p className="text-sm text-gray-500 mb-8">Мониторьте активность платформы, управляйте турнирами и контролируйте ключевые показатели в одном месте.</p>

              {/* Карточки статистики */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Пользователей', value: stats.users },
                  { label: 'Активных турниров', value: stats.activeTournaments },
                  { label: 'Матчей сегодня', value: stats.matchesToday },
                  { label: 'Судей', value: stats.judges }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Таблица турниров */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Управление турнирами</h2>
                  <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Создать турнир
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-sm text-gray-500">
                        <th className="pb-3 font-medium">Название</th>
                        <th className="pb-3 font-medium">Дата</th>
                        <th className="pb-3 font-medium">Статус</th>
                        <th className="pb-3 font-medium">Участников</th>
                        <th className="pb-3 font-medium text-right">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournaments.map((t) => (
                        <tr key={t.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                          <td className="py-4 font-medium text-gray-900">{t.title}</td>
                          <td className="py-4 text-sm text-gray-500">{t.date}</td>
                          <td className="py-4"><span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(t.status)}`}>{t.status}</span></td>
                          <td className="py-4 text-sm text-gray-900">{t.participants}</td>
                          <td className="py-4 text-right">
                            <button className="text-blue-500 hover:text-blue-700 mr-3" title="Редактировать">✏️</button>
                            <button onClick={() => handleDeleteTournament(t.id)} className="text-red-500 hover:text-red-700" title="Удалить">🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. ТУРНИРЫ (Страница) ================= */}
          {activeTab === 'tournaments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Все турниры</h1>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Создать турнир
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tournaments.map((t) => (
                  <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(t.status)}`}>{t.status}</span>
                      <span className="text-xs text-gray-400">{t.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4">{t.title}</h3>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                      <span className="text-sm text-gray-500">Участников: {t.participants}</span>
                      <div className="flex gap-2">
                         <button className="text-blue-500 hover:text-blue-700 text-sm">Ред.</button>
                         <button onClick={() => handleDeleteTournament(t.id)} className="text-red-500 hover:text-red-700 text-sm">Удал.</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 3. ПОЛЬЗОВАТЕЛИ ================= */}
          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Пользователи</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <input 
                  type="text" 
                  placeholder="Поиск пользователя по имени или email..." 
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-sm text-gray-500">
                        <th className="pb-3 font-medium">Пользователь</th>
                        <th className="pb-3 font-medium">Роль</th>
                        <th className="pb-3 font-medium">Статус</th>
                        <th className="pb-3 font-medium text-right">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map((u) => (
                        <tr key={u.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-4">
                            <p className="font-medium text-gray-900">{u.name}</p>
                            <p className="text-sm text-gray-500">{u.email}</p>
                          </td>
                          <td className="py-4 text-sm text-gray-600">{u.role}</td>
                          <td className="py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(u.status)}`}>{u.status}</span></td>
                          <td className="py-4 text-right">
                            <button className="px-3 py-1 text-xs font-medium text-orange-600 bg-orange-50 rounded hover:bg-orange-100 mr-2">Заблокировать</button>
                            <button className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100">Удалить</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. СУДЬИ ================= */}
          {activeTab === 'judges' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Судьи</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <input 
                  type="text" 
                  placeholder="Поиск судьи..." 
                  value={judgeSearch}
                  onChange={(e) => setJudgeSearch(e.target.value)}
                  className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-sm text-gray-500">
                        <th className="pb-3 font-medium">Имя</th>
                        <th className="pb-3 font-medium">Категория</th>
                        <th className="pb-3 font-medium">Проведено матчей</th>
                        <th className="pb-3 font-medium text-right">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {judges.filter(j => j.name.toLowerCase().includes(judgeSearch.toLowerCase())).map((j) => (
                        <tr key={j.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-4 font-medium text-gray-900">{j.name}</td>
                          <td className="py-4 text-sm text-gray-600">{j.category}</td>
                          <td className="py-4 text-sm text-gray-600">{j.matches}</td>
                          <td className="py-4 text-right">
                            <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 mr-2">Назначить</button>
                            <button className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100">Удалить</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. КОМАНДЫ ================= */}
          {activeTab === 'teams' && !selectedTeam && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Команды</h1>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <input 
                  type="text" 
                  placeholder="Поиск команды..." 
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teams.filter(t => t.name.toLowerCase().includes(teamSearch.toLowerCase())).map((team) => (
                    <div 
                      key={team.id} 
                      onClick={() => setSelectedTeam(team)} // <--- Клик открывает детали
                      className="bg-gray-50 border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{team.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{team.city}</p>
                      <div className="text-xs text-gray-400">Игроков в составе: {team.players}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 5.1 ДЕТАЛЬНАЯ СТРАНИЦА КОМАНДЫ (КАК НА ИЗОБРАЖЕНИИ 2) ================= */}
          {activeTab === 'teams' && selectedTeam && (
            <div>
              {/* Кнопка "Назад" */}
              <button onClick={() => setSelectedTeam(null)} className="text-sm text-blue-600 hover:underline mb-4 flex items-center gap-1">
                ← Вернуться к списку команд
              </button>

              {/* Шапка команды */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl font-bold">
                    🛡️
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{teamDetails.name}</h1>
                    <p className="text-sm text-gray-500">{teamDetails.subtitle}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Подать заявку на турнир</button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Добавить игрока</button>
                </div>
              </div>

              {/* Табы (заглушка) */}
              <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button className="pb-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Состав</button>
                <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-900">История матчей</button>
                <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-900">Заявки</button>
              </div>

              {/* Состав команды */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Состав команды</h2>
                    <p className="text-sm text-gray-500">5 игроков в текущем списке</p>
                  </div>
                  <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">5 игроков</span>
                </div>
                
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                      <th className="pb-3 font-medium w-1/2">Фото / Игрок</th>
                      <th className="pb-3 font-medium">№</th>
                      <th className="pb-3 font-medium">Позиция</th>
                      <th className="pb-3 font-medium text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamDetails.players.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {p.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.role}</p>
                          </div>
                        </td>
                        <td className="py-3 text-sm text-gray-900 font-medium">{p.number}</td>
                        <td className="py-3 text-sm text-gray-500">{p.role}</td>
                        <td className="py-3 text-right">
                          <button className="text-blue-500 hover:text-blue-700 mr-3">✏️</button>
                          <button className="text-red-500 hover:text-red-700">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* История выступлений */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">История выступлений</h2>
                <p className="text-sm text-gray-500 mb-4">Последние 3 матча команды</p>
                
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                      <th className="pb-3 font-medium">Дата</th>
                      <th className="pb-3 font-medium">Соперник</th>
                      <th className="pb-3 font-medium">Счёт</th>
                      <th className="pb-3 font-medium text-right">Результат</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamDetails.history.map((h) => (
                      <tr key={h.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-4 text-sm text-gray-500">{h.date}</td>
                        <td className="py-4 font-medium text-gray-900">{h.opponent}</td>
                        <td className="py-4 text-sm font-bold text-gray-900">{h.score}</td>
                        <td className="py-4 text-right">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getResultColor(h.result)}`}>{h.result}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 6. НАСТРОЙКИ ================= */}
          {activeTab === 'settings' && (
             <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Страница в разработке</h2>
               <p className="text-gray-500">Настройки администратора появятся в ближайшем обновлении.</p>
             </div>
          )}

        </div>
      </main>

      {/* ================= МОДАЛЬНОЕ ОКНО (СОЗДАНИЕ ТУРНИРА) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">✕</button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Создание турнира</h2>
            
            <form onSubmit={handleCreateTournament} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Название турнира</label>
                <input name="title" required type="text" placeholder="Например, Кубок города" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Вид спорта</label>
                  <select name="sport" className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option>Футбол</option>
                    <option>Баскетбол</option>
                    <option>Волейбол</option>
                    <option>Теннис</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Возрастная категория</label>
                  <select name="age" className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option>Взрослые (18+)</option>
                    <option>Юниоры (14-17)</option>
                    <option>Дети (до 13)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Инклюзивность</label>
                <select name="inclusive" className="w-full px-3 py-2 border rounded-lg bg-white">
                  <option>Стандартный (без ограничений)</option>
                  <option>Адаптивный (для людей с ОВЗ)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Дата мероприятия</label>
                  <input name="date" type="date" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Кол-во участников</label>
                  <input name="participants" type="number" placeholder="0" className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Место проведения</label>
                <input name="location" type="text" placeholder="Адрес или название стадиона" className="w-full px-3 py-2 border rounded-lg" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Отмена</button>
                <button type="submit" className="flex-1 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Создать</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}