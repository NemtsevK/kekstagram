import {hideElement} from './hide-element.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');

//сформировать фрагмент с блоком об успешной отправке
const setSuccessBlock = () => {
  const successTemplate = document.querySelector('#success').content;
  const successSection = successTemplate.querySelector('.success');
  const successFragment = document.createDocumentFragment();
  const successElement = successSection.cloneNode(true);
  return successFragment.appendChild(successElement);
};

//закрыть блок об успешной отправке
const closeSuccessModal = () => {
  const successBlock = body.querySelector('.success');
  hideElement(successBlock);
};

//событие нажать esc
const keydownEscSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessModal();
    document.removeEventListener('keydown', keydownEscSuccess);
  }
};

//вставить блок об успешной отправке
const showSuccess = () => {
  const successBlockFragment = setSuccessBlock();
  body.appendChild(successBlockFragment);
  const successBlock = body.querySelector('.success');
  const successButton = successBlock.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessModal);

  successBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success')) {
      closeSuccessModal();
    }
  });

  document.addEventListener('keydown', keydownEscSuccess);
};

export {showSuccess};
