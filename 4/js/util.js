//Получить случайное число в диапазоне
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Получить случайный элемент массива
const getArrayRandElement = function (elements) {
  return elements[getRandomInt(0, elements.length - 1)];
};

//перемешать массив (чтобы при выборе случайных элементов не было повторений)
const shuffleArray = function (array) {
  let j, temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

export {getRandomInt};
export {getArrayRandElement};
export {shuffleArray};
