import { useEffect } from 'react';

export default function EventModal({ event, onClose }) {
  // Блокировка скролла фона
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  if (!event) return null;

  const getStatusColor = (status) => {
    if (status === 'Скоро') return 'bg-blue-50 text-blue-600';
    if (status === 'Идет') return 'bg-orange-50 text-orange-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ВЕРХНЯЯ ЧАСТЬ (Заголовок) */}
        <div className="p-6 border-b border-gray-100 shrink-0">
          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-3">{event.title}</h2>
        </div>

        {/* СРЕДНЯЯ ЧАСТЬ (Характеристики) */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <p className="text-sm text-gray-400 mb-1">Вид спорта</p>
              <p className="font-semibold text-gray-900">{event.sport}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Возрастная категория</p>
              <p className="font-semibold text-gray-900">{event.ageCategory || 'Взрослые (18+)'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Даты проведения</p>
              <p className="font-semibold text-gray-900">{event.startDate} — {event.endDate || event.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Место проведения</p>
              <p className="font-semibold text-gray-900">{event.location || 'Не указано'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Участников</p>
              <p className="font-semibold text-gray-900">{event.participants} чел.</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Инклюзивность</p>
              <p className="font-semibold text-gray-900">{event.inclusive || 'Стандартный'}</p>
            </div>
          </div>
        </div>

        {/* НИЖНЯЯ ЧАСТЬ (Кнопки) */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Закрыть
          </button>
          <button className="px-5 py-2.5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            Подать заявку
          </button>
        </div>
      </div>
    </div>
  );
}