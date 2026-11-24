import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal'; // <-- Импортируем

export default function Events() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('adminTournaments');
    if (saved) {
      setTournaments(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Мероприятия</h1>
          <p className="text-gray-500">Актуальные спортивные события города</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tour) => (
            <EventCard 
              key={tour.id} 
              event={tour} 
              isAdminView={false} 
              onDetailsClick={(event) => setSelectedEvent(event)} 
            />
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">Пока нет активных мероприятий.</p>
          </div>
        )}
      </div>

      {/* МОДАЛЬНОЕ ОКНО (теперь просто вызов компонента) */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
}