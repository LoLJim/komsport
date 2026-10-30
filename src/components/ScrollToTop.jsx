import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // Получаем текущий путь (URL)
  const { pathname } = useLocation();

  // Каждый раз, когда pathname меняется (то есть происходит переход), выполняем скролл
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 'smooth' делает прокрутку плавной, можешь убрать, если хочешь мгновенно
    });
  }, [pathname]);

  // Этот компонент ничего не рисует на экране, он нужен только для логики
  return null;
}