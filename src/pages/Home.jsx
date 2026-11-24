import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Загрузка ближайших мероприятий
  useEffect(() => {
    const saved = localStorage.getItem('adminTournaments');
    if (saved) {
      const allTournaments = JSON.parse(saved);
      const filtered = allTournaments
        .filter(t => t.status === 'Скоро')
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setUpcomingEvents(filtered.slice(0, 3));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. ГЛАВНЫЙ БАННЕР */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl leading-tight">
            Кубок города по футболу 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Присоединяйтесь к главному спортивному событию года. Зарегистрируйте свою команду и боритесь за чемпионство.
          </p>
          <Link to="/events" className="px-6 py-3.5 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
            Зарегистрировать команду →
          </Link>
        </div>
      </section>

      {/* 2. БЛИЖАЙШИЕ МЕРОПРИЯТИЯ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Ближайшие мероприятия</h2>
              <p className="text-gray-500 text-sm">Следите за календарем спортивных событий</p>
            </div>
            <Link to="/events" className="text-sm font-medium text-blue-600 hover:underline">
              Все мероприятия
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isAdminView={false} 
                  onDetailsClick={(ev) => setSelectedEvent(ev)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">Пока нет запланированных мероприятий.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. ПОСЛЕДНИЕ РЕЗУЛЬТАТЫ (ВОТ ОН!) */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Последние результаты</h2>
            <p className="text-gray-500 text-sm">Обновления со всех спортивных площадок</p>
          </div>

          <div className="space-y-4">
            {/* Временные данные для наглядности. В будущем будут браться из БД */}
            {[
              { id: 1, home: 'Динамо', score: '3:1', away: 'Спартак' },
              { id: 2, home: 'Локомотив', score: '2:2', away: 'ЦСКА' },
              { id: 3, home: 'Зенит', score: '1:0', away: 'Рубин' },
            ].map((match) => (
              <div key={match.id} className="grid items-center grid-cols-[1fr_auto_1fr] p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-semibold text-left text-gray-900">{match.home}</span>
                <div className="px-6 py-1.5 font-bold bg-white rounded text-gray-900 border border-gray-200 shadow-sm">
                  {match.score}
                </div>
                <span className="font-semibold text-right text-gray-900">{match.away}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
}