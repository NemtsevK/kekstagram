const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Илья',
  'Василий',
  'Андрей',
  'Геннадий',
  'Сергей',
  'Светлана',
  'Евгений',
  'Мария',
  'Пётр',
  'Дарья',
  'Татьяна',
  'Олег',
  'Валерий',
  'Наталья',
  'Екатерина',
  'Станислав',
  'Роман',
  'Анастасия',
  'Павел',
  'Валентина',
  'Ирина',
];

const DESCRIPTIONS = [
  'Пляж у отеля',
  'Указатель на пляж',
  'Камни у пляжа',
  'Девушка с фотоаппаратом',
  'Две тарелки с супом',
  'Чёрный суперкар',
  'Клубника на тарелке',
  'Клюквенный морс',
  'Самолёт над пляжем',
  'Шкаф для обуви',
  'Забор на пляже',
  'Ауди',
  'Овощи в фольге',
  'Кот',
  'Смешная обувь',
  'Самолёт над горами',
  'Хор',
  'Ретро-автомобиль',
  'Ночная подсветка',
  'Пальмы у отеля',
  'Вкусная еда',
  'Закат у моря',
  'Милый краб',
  'Концерт',
  'Машина и бегемот'
];

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

//Получить текст комментария
const getMessage = function () {
  let messageText = '';
  const MESSAGE_SHUFFLE = shuffleArray(MESSAGES);
  for (let i = 0; i < getRandomInt(1, 2); i++) {
    if (i) {
      messageText += ' ';
    }
    messageText += MESSAGE_SHUFFLE[i];
  }
  return messageText;
};

//получить комментарий
const getComment = function (number) {
  return {
    id: number,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getMessage(),
    name: getArrayRandElement(NAMES),
  };
};

//получить массив комментариев
const getCommentArray = function (number) {
  const countComment = getRandomInt(0, 30);
  const commentArray = [];
  if (countComment) {
    for (let i = 0; i < countComment; i++) {
      commentArray[i] = getComment(number);
      number++;
    }
  }
  return {number: number, comments: commentArray};
};

//получить массив фотографий
const getPhotos = function (number) {
  let numberComment = 0;
  const myArray = [];
  for (let i = 1; i <= number; i++) {
    const commentArray = getCommentArray(numberComment);
    numberComment = commentArray.number;
    myArray[i] = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i - 1],
      likes: getRandomInt(15, 200),
      comments: commentArray.comments,
    };
  }
  return myArray;
};

getPhotos(25);
