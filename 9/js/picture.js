import {createArrayPhotos} from './data.js';

//поиск шаблона и блока ссылки внутри него
const similarPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//создание фрагмента
const similarListFragment = document.createDocumentFragment();

//формирование массива с фотографиями
const arrayPhotos = createArrayPhotos(25);
arrayPhotos.forEach(({url, description, likes, comments}) => {
  //клонирование блока ссылки из template
  const photoElement = similarPhotoTemplate.cloneNode(true);
  //вставка атрибутов в фотографию
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  //вставка фотографии во фрагмент
  similarListFragment.appendChild(photoElement);
});

//добавление фрагмента в финальный контейнер для фотографий
const addPhotosFragment = function () {
  const finalListPhotos = document.querySelector('.pictures');
  finalListPhotos.appendChild(similarListFragment);
  return finalListPhotos.querySelectorAll('.picture');
};

export {arrayPhotos, addPhotosFragment};
