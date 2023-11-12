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

//закрыть блок об ошибке
const closeErrorModal = () => {
  const errorBlock = body.querySelector('.error');
  hideElement(errorBlock);
};

//событие нажать esc
const keydownEscError = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorModal();
    document.removeEventListener('keydown', keydownEscError);
  }
};

//вставить блок об ошибке
const errorSendData = () => {
  const errorBlockFragment = setErrorBlock();
  body.appendChild(errorBlockFragment);
  const errorBlock = body.querySelector('.error');
  const errorButton = errorBlock.querySelector('.error__button');

  errorButton.addEventListener('click', closeErrorModal);

  errorBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error')) {
      closeErrorModal();
    }
  });

  document.addEventListener('keydown', keydownEscError);
};

export {errorSendData};
