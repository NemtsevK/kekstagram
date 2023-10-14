import {getRandomInt} from './util.js';
import {getArrayRandElement} from './util.js';
import {shuffleArray} from './util.js';

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

//создать текст комментария
const createMessage = function () {
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

//создать комментарий
const createComment = function (number) {
  return {
    id: number,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: createMessage(),
    name: getArrayRandElement(NAMES),
  };
};

//создать массив комментариев
const createComments = function (number) {
  const countComment = getRandomInt(0, 30);
  const commentArray = [];
  if (countComment) {
    for (let i = 0; i < countComment; i++) {
      commentArray[i] = createComment(number);
      number++;
    }
  }
  return {number: number, comments: commentArray};
};

//создать массив фотографий
const createPhotos = function (number) {
  let numberComment = 0;
  const finalArray = [];
  for (let i = 1; i <= number; i++) {
    const commentArray = createComments(numberComment);
    numberComment = commentArray.number;
    finalArray[i] = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i - 1],
      likes: getRandomInt(15, 200),
      comments: commentArray.comments,
    };
  }
  return finalArray;
};

export {createPhotos};
