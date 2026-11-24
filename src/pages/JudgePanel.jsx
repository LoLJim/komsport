import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JudgePanel() {
  const [activeTab, setActiveTab] = useState('matches');
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(10); // Ноябрь
  const [currentYear, setCurrentYear] = useState(2026);

  // Массив матчей с датами
  const assignedMatches = [
    { id: 1, time: '14:00', location: 'Олимп', homeTeam: 'Спартак', awayTeam: 'Динамо', tournament: 'Кубок города', homeScore: 0, awayScore: 0, timer: '45:00', date: '2026-11-03' },
    { id: 2, time: '17:30', location: 'Арена-2', homeTeam: 'Локомотив', awayTeam: 'ЦСКА', tournament: 'Первенство города', homeScore: 0, awayScore: 0, timer: '00:00', date: '2026-11-04' },
    { id: 3, time: '20:00', location: 'Центральный', homeTeam: 'Торпедо', awayTeam: 'Рубин', tournament: 'Лига чемпионов', homeScore: 0, awayScore: 0, timer: '00:00', date: '2026-11-11' },
    { id: 4, time: '18:00', location: 'Олимп', homeTeam: 'Зенит', awayTeam: 'Краснодар', tournament: 'Кубок России', homeScore: 0, awayScore: 0, timer: '00:00', date: '2026-11-17' },
  ];

  // СЕГОДНЯШНЯЯ ДАТА (для теста ставим 2026-11-03, чтобы показать матч)
  const todayDate = '2026-11-03'; 
  
  // Фильтруем матчи, которые проходят СЕГОДНЯ
  const todayMatches = assignedMatches.filter(m => m.date === todayDate);

  const changeMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const monthNames = ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'];

  const renderCalendar = () => {
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let startDayOfWeek = firstDayOfMonth.getDay();
    if (startDayOfWeek === 0) startDayOfWeek = 7;
    
    const days = [];
    for (let i = 1; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <button onClick={() => changeMonth('prev')} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
            <span>◀</span> {monthNames[currentMonth === 0 ? 11 : currentMonth - 1]}
          </button>
          <h2 className="text-lg font-bold text-gray-900">{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={() => changeMonth('next')} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
            {monthNames[currentMonth === 11 ? 0 : currentMonth + 1]} <span>▶</span>
          </button>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-100">
          {weekDays.map((day, idx) => (
            <div key={idx} className="py-2 text-center text-xs font-semibold text-gray-700 bg-gray-50 border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dateString = day ? `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
            const matchesOnDay = dateString ? assignedMatches.filter(m => m.date === dateString) : [];

            return (
              <div key={idx} className="min-h-[120px] border-r border-b border-gray-100 p-1.5 flex flex-col relative last:border-r-0">
                {day && (
                  <>
                    <span className="text-xs text-gray-500 mb-1 font-medium">{day}</span>
                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
                      {matchesOnDay.map((match, i) => (
                        <div key={i} className="flex items-start gap-1 cursor-pointer group bg-gray-50 p-1 rounded hover:bg-blue-50 transition-colors" title={`${match.homeTeam} - ${match.awayTeam}`}>
                          <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0 mt-1"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-700 leading-tight font-medium group-hover:text-blue-600 truncate">
                              {match.homeTeam} - {match.awayTeam}
                            </span>
                            <span className="text-[9px] text-gray-500">{match.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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

          <div className="p-4">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white bg-gray-800 rounded-full">СД</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Судья</h3>
                <p className="text-xs text-gray-500">Алексей Иванов</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button onClick={() => { setActiveTab('matches'); setSelectedMatch(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'matches' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <span>⚖️</span> Мои матчи
              </button>
              <button onClick={() => { setActiveTab('calendar'); setSelectedMatch(null); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <span>📅</span> Календарь
              </button>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <span>↩</span> Выйти
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {activeTab === 'matches' ? 'Расписание судьи' : 'Календарь матчей'}
              </h1>
              <p className="text-sm text-gray-500">15 октября 2026</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                Новая запись
              </button>
            </div>
          </div>

          {/* ВКЛАДКА: МОИ МАТЧИ (Только на сегодня) */}
          {activeTab === 'matches' && (
            <div className={`grid gap-6 ${selectedMatch ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
              
              <div className={`${selectedMatch ? 'lg:col-span-2' : 'col-span-1'} space-y-4`}>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">Назначенные матчи</h2>
                  <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-md">
                    {todayMatches.length} матча на сегодня
                  </span>
                </div>

                {todayMatches.length > 0 ? (
                  todayMatches.map((match) => {
                    const isSelected = selectedMatch?.id === match.id;

                    return (
                      <div key={match.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{match.time}</span>
                            <span className="text-sm text-gray-500">{match.location}</span>
                          </div>
                          <span className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md">
                            {match.tournament}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-4">
                          <div className="text-right">
                            <p className="font-bold text-gray-900">{match.homeTeam}</p>
                            <p className="text-xs text-gray-500">Домашняя</p>
                          </div>
                          <div className="text-gray-400 font-medium text-sm">vs</div>
                          <div className="text-left">
                            <p className="font-bold text-gray-900">{match.awayTeam}</p>
                            <p className="text-xs text-gray-500">Гостевая</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500">
                            {isSelected ? 'Матч выбран для протокола' : 'Матч ожидает открытия'}
                          </p>
                          <button 
                            onClick={() => setSelectedMatch(isSelected ? null : match)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                              isSelected ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {isSelected ? 'Протокол открыт' : 'Открыть протокол'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                    <p className="text-gray-500">На сегодня назначенных матчей нет.</p>
                  </div>
                )}
              </div>

              {selectedMatch && (
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">Протокол матча</h2>
                        <p className="text-xs text-gray-500">{selectedMatch.tournament}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium text-orange-600 bg-orange-50 rounded-md">Активный</span>
                        <button onClick={() => setSelectedMatch(null)} className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                          ✕
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Счет</p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-900">{selectedMatch.homeScore}</div>
                        <span className="text-gray-400">:</span>
                        <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-900">{selectedMatch.awayScore}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Таймер</p>
                      <div className="bg-orange-50 text-orange-600 text-3xl font-bold text-center py-3 rounded-lg border border-orange-100">{selectedMatch.timer}</div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Нарушения</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">{selectedMatch.homeTeam}</span>
                          <div className="flex items-center gap-2">
                            <button className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:bg-gray-100 text-gray-600">-</button>
                            <span className="font-bold">0</span>
                            <button className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:bg-gray-100 text-gray-600">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                          <span className="text-xs font-medium text-gray-700">{selectedMatch.awayTeam}</span>
                          <div className="flex items-center gap-2">
                            <button className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:bg-gray-100 text-gray-600">-</button>
                            <span className="font-bold">0</span>
                            <button className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:bg-gray-100 text-gray-600">+</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Комментарии</p>
                      <textarea className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24" placeholder="Добавьте заметки..."></textarea>
                    </div>

                    <button className="w-full py-3 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm">Зафиксировать результат</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ВКЛАДКА: КАЛЕНДАРЬ */}
          {activeTab === 'calendar' && (
            <div className="animate-fade-in">
              {renderCalendar()}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}