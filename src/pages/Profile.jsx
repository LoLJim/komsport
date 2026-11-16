import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавили useNavigate

export default function Profile() {
  const navigate = useNavigate(); // Инициализация навигации
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    firstName: 'Иван',
    lastName: 'Петров',
    role: 'Участник',
    age: '',
    rank: '',
    team: '',
    teamId: null,
    avatar: '' 
  });

  const [teamInput, setTeamInput] = useState('');
  const [showTeamSuggestions, setShowTeamSuggestions] = useState(false);

  const [myTournaments, setMyTournaments] = useState([]);
  const [myStats, setMyStats] = useState([
    { label: "Игр сыграно", value: 0 },
    { label: "Голов", value: 0 },
    { label: "Побед", value: 0 },
    { label: "Наград", value: 0 },
  ]);

  const availableTeams = [
    { id: 1, name: "Спартак-Арена" },
    { id: 2, name: "Динамо" },
    { id: 3, name: "ФК Юность" },
    { id: 4, name: "Локомотив" },
    { id: 5, name: "ЦСКА" },
    { id: 6, name: "Зенит" },
    { id: 7, name: "Рубин" },
    { id: 8, name: "Краснодар" }
  ];

  useEffect(() => {
    const savedData = localStorage.getItem('userProfile_v4');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setProfileData(parsed);
      setTeamInput(parsed.team || ''); 
    }

    const savedTournaments = localStorage.getItem('myTournaments');
    if (savedTournaments) {
      setMyTournaments(JSON.parse(savedTournaments));
    }

    const savedStats = localStorage.getItem('myStats');
    if (savedStats) {
      setMyStats(JSON.parse(savedStats));
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();

    const teamExists = availableTeams.find(t => t.name.toLowerCase() === teamInput.toLowerCase());

    if (teamInput !== '' && !teamExists) {
      alert('Ошибка: Такой команды не существует в базе. Пожалуйста, выберите из списка.');
      return;
    }

    const updatedProfile = {
      ...profileData,
      team: teamExists ? teamExists.name : '',
      teamId: teamExists ? teamExists.id : null
    };

    setProfileData(updatedProfile);
    localStorage.setItem('userProfile_v4', JSON.stringify(updatedProfile));
    alert('Данные профиля успешно сохранены!');
    setActiveTab('profile'); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...profileData, avatar: reader.result };
        setProfileData(updatedProfile);
        localStorage.setItem('userProfile_v4', JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTeam = (team) => {
    setProfileData(prev => ({ ...prev, team: team.name, teamId: team.id }));
    setTeamInput(team.name);
    setShowTeamSuggestions(false);
  };

  const filteredTeams = availableTeams.filter(team => 
    team.name.toLowerCase().includes(teamInput.toLowerCase())
  );

  const handleAddTournament = () => {
    if (myTournaments.length > 0) return alert("Турнир уже добавлен!");
    const newTournament = {
      id: Date.now(), title: "Кубок города по футболу", status: "Скоро", date: "18 окт", desc: "Групповой этап • Центральный стадион", time: "18:00 • Первый матч"
    };
    const newStats = [
      { label: "Игр сыграно", value: 1 }, { label: "Голов", value: 0 }, { label: "Побед", value: 0 }, { label: "Наград", value: 0 },
    ];
    setMyTournaments([newTournament]);
    setMyStats(newStats);
    localStorage.setItem('myTournaments', JSON.stringify([newTournament]));
    localStorage.setItem('myStats', JSON.stringify(newStats));
    setActiveTab('tournaments');
  };

  const menuItems = [
    { id: 'profile', label: 'Профиль', icon: '👤' },
    { id: 'tournaments', label: 'Мои турниры', icon: '🏆' },
    { id: 'stats', label: 'Статистика', icon: '📊' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  const getStatusColor = (status) => {
    if (status === 'Скоро') return 'bg-blue-50 text-blue-600';
    if (status === 'Идет') return 'bg-orange-50 text-orange-600';
    return 'bg-gray-100 text-gray-600';
  };

  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
  const initials = `${profileData.firstName?.[0] || ''}${profileData.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
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

          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Avatar" className="w-12 h-12 object-cover rounded-full border border-gray-200" />
              ) : (
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-blue-600 bg-blue-100 rounded-full">
                  {initials}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{fullName || 'Без имени'}</h3>
                <p className="text-xs text-gray-500">{profileData.role}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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

        {/* ИСПРАВЛЕНО: Кнопка "Выйти" теперь возвращает назад */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => navigate(-1)} 
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <span>↩</span> Выйти
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Личный кабинет</h1>
              <p className="text-sm text-gray-500">Добро пожаловать, {profileData.firstName || 'гость'}.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Сообщить об изменении
              </button>
              <button 
                onClick={handleAddTournament}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Добавить турнир (Демо)
              </button>
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Профиль участника</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Avatar" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      <span className="text-3xl">👤</span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{fullName || 'Имя не указано'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Возраст</p>
                        <p className="font-medium text-gray-900">
                          {profileData.age ? `${profileData.age} лет` : <span className="text-gray-400 font-normal">Не указан</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Спортивный ранг</p>
                        <p className="font-medium text-gray-900">
                          {profileData.rank || <span className="text-gray-400 font-normal">Не указан</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Команда</p>
                        <p className="font-medium text-gray-900">
                          {profileData.team ? (
                            <Link to={`/team/${profileData.teamId}`} className="text-blue-600 hover:underline">
                              {profileData.team}
                            </Link>
                          ) : (
                            <span className="text-gray-400 font-normal">Не указана</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Мои турниры</h2>
                  <button onClick={() => setActiveTab('tournaments')} className="text-sm font-medium text-blue-600 hover:underline">Все турниры</button>
                </div>
                {myTournaments.length === 0 ? (
                  <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">Вы пока не участвуете ни в одном турнире.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                     <div>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusColor(myTournaments[0].status)}`}>{myTournaments[0].status}</span>
                        <h4 className="font-bold text-gray-900 mt-2">{myTournaments[0].title}</h4>
                        <p className="text-sm text-gray-500">{myTournaments[0].desc}</p>
                     </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Личная статистика</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {myStats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col justify-center">
                      <p className="text-xs text-gray-500 mb-2">{stat.label}</p>
                      <p className={`text-3xl font-bold ${stat.value > 0 ? 'text-blue-600' : 'text-gray-300'}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tournaments' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Мои турниры</h2>
              </div>
              
              {myTournaments.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Пока пусто</h3>
                  <p className="text-gray-500 text-sm">Что на данный момент, Вы нигде не участвовали.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myTournaments.map((tour) => (
                    <div key={tour.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${getStatusColor(tour.status)}`}>{tour.status}</span>
                          <span className="text-xs text-gray-400">{tour.date}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{tour.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{tour.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
                        <span>📍</span> {tour.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Личная статистика</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {myStats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col justify-center">
                      <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                      <p className={`text-3xl font-bold ${stat.value > 0 ? 'text-blue-600' : 'text-gray-300'}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Настройки профиля</h2>
              <form onSubmit={handleSaveSettings} className="space-y-5 max-w-lg">
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Фотография профиля</label>
                  <div className="flex items-center gap-4">
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="Preview" className="w-16 h-16 object-cover rounded-full border border-gray-200" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200">👤</div>
                    )}
                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Выбрать фото
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-700">Имя</label>
                    <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="Введите имя" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                    <label className="block mb-1.5 text-sm font-medium text-gray-700">Фамилия</label>
                    <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Введите фамилию" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium text-gray-700">Возраст</label>
                  <input type="number" name="age" value={profileData.age} onChange={handleChange} placeholder="Например, 24" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-gray-700">Спортивный ранг</label>
                  <input type="text" name="rank" value={profileData.rank} onChange={handleChange} placeholder="Например, КМС" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                
                <div className="relative">
                  <label className="block mb-1.5 text-sm font-medium text-gray-700">Команда</label>
                  <input 
                    type="text" 
                    value={teamInput} 
                    onChange={(e) => {
                      setTeamInput(e.target.value);
                      setShowTeamSuggestions(true);
                      if (e.target.value === '') {
                        setProfileData(prev => ({ ...prev, team: '', teamId: null }));
                      }
                    }}
                    onFocus={() => setShowTeamSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowTeamSuggestions(false), 200)} 
                    placeholder="Начните вводить название..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  {showTeamSuggestions && teamInput.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredTeams.length > 0 ? (
                        filteredTeams.map((team) => (
                          <li 
                            key={team.id} 
                            onClick={() => handleSelectTeam(team)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-sm text-gray-700"
                          >
                            {team.name}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-sm text-gray-400">Команда не найдена</li>
                      )}
                    </ul>
                  )}
                </div>
                
                <button type="submit" className="px-6 py-2.5 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 mt-2">
                  Сохранить изменения
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}