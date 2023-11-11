import {hideElement} from './hide-element.js';

const TIME_HIDE_ERROR = 5000;
const body = document.querySelector('body');

//сформировать фрагмент с блоком ошибкой
const setErrorBlock = (text) => {
  const errorTemplate = document.querySelector('#data-error').content;
  const pictureSection = errorTemplate.querySelector('.data-error');
  const errorFragment = document.createDocumentFragment(); //создание фрагмента
  const errorElement = pictureSection.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = text;
  return errorFragment.appendChild(errorElement);
};

//вставить блок с ошибкой
const showError = (text) => {
  const errorBlock = setErrorBlock(text);
  body.appendChild(errorBlock);
  hideElement(errorBlock, TIME_HIDE_ERROR);
};

export {showError};
