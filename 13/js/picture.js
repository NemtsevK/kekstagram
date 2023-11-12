//поиск шаблона и блока ссылки внутри него
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');

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

//добавление фрагмента в финальный контейнер для фотографий
const addPhotosFragment = (photos) => {
  const finalListPhotos = document.querySelector('.pictures');
  const photosFragment = setPhotosFragment(photos);
  finalListPhotos.appendChild(photosFragment);
  return finalListPhotos.querySelectorAll('.picture');
};

export {addPhotosFragment};
