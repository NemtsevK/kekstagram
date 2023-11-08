import {addPhotosFragment} from './picture.js';
import {addClickEvent} from './user-modal.js';
import './user-form.js';

const userModalOpenElements = addPhotosFragment();
addClickEvent(userModalOpenElements);
