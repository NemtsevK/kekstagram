//поиск шаблона и блока ссылки внутри него
import {addClickEvent} from './user-modal.js';
import {shuffleArray} from './util.js';

const finalListPhotos = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');
const filterImages = document.querySelector('.img-filters');
const filtersList = filterImages.querySelectorAll('.img-filters__button');

const COUNT_RANDOM_PHOTOS = 10;

//добавление данных во фрагмент
const setPhotosFragment = (photos) => {
  const photosFragment = document.createDocumentFragment(); //создание фрагмента
  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = pictureLink.cloneNode(true); //клонирование блока ссылки из template
    //вставка атрибутов в фотографию
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosFragment.appendChild(photoElement); //вставка фотографии во фрагмент
  });
  return photosFragment;
};

//удалить все фотографии
const removeAllPhotos = () => {
  const elementsToRemove = finalListPhotos.querySelectorAll('.picture');
  elementsToRemove.forEach((element) => {
    element.remove();
  });
};

//изменить массив с фотографиями
const changeArrayPhotos = (photos, filterId) => {
  switch (filterId) {
    case 'filter-default':
      photos.sort((a, b) => a.id - b.id);
      break;
    case 'filter-random':
      shuffleArray(photos);
      photos = photos.slice(0, COUNT_RANDOM_PHOTOS);
      break;
    case 'filter-discussed':
      photos.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  return photos;
};

//проверка на изменение фильтра
const checkChangeFilter = (photos, event) => {
  if (typeof event !== 'undefined') {
    removeAllPhotos();
    const filterId = event.target.id;
    photos = changeArrayPhotos(photos, filterId);
  }
  return photos;
};

//добавление фрагмента в финальный контейнер для фотографий
const setPhotosContainer = (photos, event) => {
  photos = checkChangeFilter(photos, event);
  const photosFragment = setPhotosFragment(photos);
  finalListPhotos.appendChild(photosFragment);
  filterImages.classList.remove('img-filters--inactive');
  const photosContainer = finalListPhotos.querySelectorAll('.picture');
  addClickEvent(photosContainer, photos);
};

//удалить класс active у всех кнопок, добавить класс active к нажатой кнопке
const toggleFilterActive = (clickedFilter) => {
  filtersList.forEach((filter) => filter.classList.remove('img-filters__button--active'));
  clickedFilter.classList.add('img-filters__button--active');
};

//установка события на клик по фильтру
const setFilterClick = (cd) => {
  filtersList.forEach((filter) => {
    filter.addEventListener('click', function (event) {
      toggleFilterActive(this);
      cd(event);
    });
  });
};

export {setPhotosContainer, setFilterClick};
