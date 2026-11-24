export default function EventCard({ event, isAdminView = false, onDelete, onEdit, onDetailsClick }) {
  const getStatusColor = (status) => {
    if (status === 'Скоро') return 'bg-blue-50 text-blue-600';
    if (status === 'Идет') return 'bg-orange-50 text-orange-600';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
      
      {/* БЛОК С КАРТИНКОЙ: aspect-video делает пропорции 16:9 */}
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover object-center" 
          />
        ) : (
          <span className="text-4xl">🏆</span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
          <span className="text-xs text-gray-400 text-right">
            {event.startDate} — {event.endDate || event.startDate}
          </span>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-1 text-lg leading-tight">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{event.sport} • {event.location || 'Место уточняется'}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">Участников: {event.participants}</span>
          
          {isAdminView ? (
            <div className="flex gap-2">
              <button onClick={() => onEdit && onEdit(event)} className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                Ред.
              </button>
              <button onClick={() => onDelete && onDelete(event.id)} className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                Удал.
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onDetailsClick && onDetailsClick(event)}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}