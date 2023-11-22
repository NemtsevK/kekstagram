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

//событие закрыть блок об успешной отправке по клику
const onCloseSuccessModalClick = () => {
  const successBlock = body.querySelector('.success');
  hideElement(successBlock);
};

//событие закрыть блок об успешной отправке по кнопке esc
const onSuccessEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    const successBlock = body.querySelector('.success');
    hideElement(successBlock);
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
};

//вставить блок об успешной отправке
const showSuccess = () => {
  const successBlockFragment = setSuccessBlock();
  body.appendChild(successBlockFragment);
  const successBlock = body.querySelector('.success');
  const successButton = successBlock.querySelector('.success__button');
  successButton.addEventListener('click', onCloseSuccessModalClick);

  successBlock.addEventListener('click', (event) => {
    if (event.target.classList.contains('success')) {
      hideElement(successBlock);
    }
  });

  document.addEventListener('keydown', onSuccessEscKeydown);
};

export {showSuccess};
