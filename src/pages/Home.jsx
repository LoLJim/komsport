export default function Home() {
  // Имитация данных (в реальности придут с бэкенда)
  const events = [
    { id: 1, title: "Кубок города по футболу", date: "12.10.2026", img: "..." },
    { id: 2, title: "Открытый турнир по баскетболу", date: "15.10.2026", img: "..." },
    { id: 3, title: "Межмуниципальный турнир по волейболу", date: "18.10.2026", img: "..." },
  ];

  const results = [
    { home: "Динамо", score: "3:1", away: "Спартак" },
    { home: "Локомотив", score: "2:2", away: "ЦСКА" },
    { home: "Зенит", score: "1:0", away: "Рубин" },
  ];

  return (
    <div className="p-8">
      {/* 3.3.1 Карусель (Главный баннер) */}
      <section className="relative p-12 mb-12 text-white bg-gray-800 rounded-lg">
        <h1 className="mb-4 text-4xl font-bold">Кубок города по футболу 2026</h1>
        <p className="mb-6">Присоединяйтесь к главному спортивному событию года.</p>
        <button className="px-6 py-3 font-bold text-white bg-orange-500 rounded">Зарегистрировать команду →</button>
      </section>

      {/* 3.3.2 Ближайшие мероприятия */}
      <section className="mb-12">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Ближайшие мероприятия</h2>
          <a href="#" className="text-blue-500">Все мероприятия</a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="overflow-hidden bg-white border rounded-lg shadow">
              <div className="h-48 bg-gray-300">{/* Место для картинки */}</div>
              <div className="p-4">
                <span className="text-sm text-gray-500">{event.date}</span>
                <h3 className="my-2 font-bold">{event.title}</h3>
                <button className="w-full py-2 mt-4 border rounded">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </section>

            {/* 3.3.3 Последние результаты */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Последние результаты</h2>
        <div className="space-y-4">
          {results.map((res, index) => (
            // Используем Grid: первая колонка 1fr, центр auto (по размеру), правая 1fr
            <div 
              key={index} 
              className="grid items-center grid-cols-[1fr_auto_1fr] p-4 bg-white border rounded-lg shadow-sm"
            >
              {/* Левая команда (выравниваем по левому краю) */}
              <span className="font-semibold text-left">
                {res.home}
              </span>
              
              {/* Счет (строго по центру) */}
              <div className="px-6 py-1 font-bold bg-gray-100 rounded text-gray-800">
                {res.score}
              </div>
              
              {/* Правая команда (выравниваем по правому краю) */}
              <span className="font-semibold text-right">
                {res.away}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}