import {addPhotosFragment} from './picture.js';
import {addClickEvent} from './user-modal.js';

const userModalOpenElements = addPhotosFragment();
addClickEvent(userModalOpenElements);
