import {addPhotosFragment} from './picture.js';
import {addClickEvent} from './user-modal.js';
import {getData} from './api.js';

getData()
  .then((photos) => {
    const photosContainer = addPhotosFragment(photos);
    console.log(photosContainer);
    addClickEvent(photosContainer, photos);
  });
