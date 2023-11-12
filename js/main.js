import {addPhotosFragment} from './picture.js';
import {addClickEvent} from './user-modal.js';
import {setPhotoFromSubmit, successPhotoSubmit} from './user-form.js';
import {getData} from './api.js';

//получить фото от сервера
getData()
  .then((photos) => {
    const photosContainer = addPhotosFragment(photos);
    addClickEvent(photosContainer, photos);
  });

//отправить фото на сервер
setPhotoFromSubmit(successPhotoSubmit);
