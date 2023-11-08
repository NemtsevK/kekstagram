//Получить случайное число в диапазоне
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

//Получить случайный элемент массива
const getArrayRandElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createArray = (start, end) => {
  const array = [];
  let count = 0;
  for (let i = start; i <= end; i++) {
    array[count] = i;
    count++;
  }
  return array;
};

//перемешать массив (чтобы при выборе случайных элементов не было повторений)
const shuffleArray = (array) => {
  let j, temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

//если нажата кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInt, getArrayRandElement, shuffleArray, createArray, isEscapeKey};
