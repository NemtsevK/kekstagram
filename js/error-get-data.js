import {hideElement} from './hide-element.js';

const TIME_HIDE_ERROR = 5000;
const body = document.querySelector('body');

//сформировать фрагмент с блоком ошибкой
const setErrorBlock = () => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorSection = errorTemplate.querySelector('.data-error');
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorSection.cloneNode(true);
  return errorFragment.appendChild(errorElement);
};

//вставить блок с ошибкой
const errorGetData = () => {
  const errorBlock = setErrorBlock();
  body.appendChild(errorBlock);
  hideElement(errorBlock, TIME_HIDE_ERROR);
};

export {errorGetData};
