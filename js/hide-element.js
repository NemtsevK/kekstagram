//анимация плавного исчезания элемента
const fadeIn = (element) => {
  // Применяем начальные стили
  element.style.opacity = '1';
  element.style.transition = 'opacity 0.5s ease-in-out';
  // Запускаем анимацию
  requestAnimationFrame(() => {
    element.style.opacity = '0';
  });
  element.addEventListener('transitionend', () => {
    element.remove();
  });
};

//скрыть элемент через время
const hideElement = (element, time) => {
  setTimeout(() => {
    fadeIn(element);
  }, time);
};

export {hideElement};
