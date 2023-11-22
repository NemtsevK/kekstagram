import {hideElement} from './hide-element.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');

//сформировать фрагмент с ошибкой
const setErrorBlock = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorSection = errorTemplate.querySelector('.error');
  const errorFragment = document.createDocumentFragment();
  const errorElement = errorSection.cloneNode(true);
  return errorFragment.appendChild(errorElement);
};

//событие закрыть блок об ошибке по клику
const onCloseErrorModalClick = () => {
  const errorBlock = body.querySelector('.error');
  hideElement(errorBlock);
};

//событие закрыть блок об ошибке по кнопке esc
const onEscErrorKeydown = (event) => {
  if (isEscapeKey(event)) {
    const errorBlock = body.querySelector('.error');
    hideElement(errorBlock);
    document.removeEventListener('keydown', onEscErrorKeydown);
  }
};

//вставить блок об ошибке
const errorSendData = () => {
  const errorBlockFragment = setErrorBlock();
  body.appendChild(errorBlockFragment);
  const errorBlock = body.querySelector('.error');
  const errorButton = errorBlock.querySelector('.error__button');
  errorButton.addEventListener('click', onCloseErrorModalClick);

  errorBlock.addEventListener('click', (event) => {
    if (event.target.classList.contains('error')) {
      hideElement(errorBlock);
    }
  });

  document.addEventListener('keydown', onEscErrorKeydown);
};

export {errorSendData};
