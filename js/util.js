//если нажата кнопка Esc
const isEscapeKey = (event) => event.key === 'Escape';

//перемешать массив
const shuffle = (items) => {
  let randomIndex;
  let temporaryValue;
  for (let i = items.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    temporaryValue = items[randomIndex];
    items[randomIndex] = items[i];
    items[i] = temporaryValue;
  }
  return items;
};

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {isEscapeKey, shuffle, debounce};
