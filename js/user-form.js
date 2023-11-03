import {isEscapeKey} from './util.js';
import {COUNT_HASHTAGS, MAX_DESCRIPTION, validateHashtags, validateCountWords, validateDuplicateWords, validateTextLength} from './validation.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const userModalElement = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonModalClose = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');

//Добавить изображение
imageUploadInput.addEventListener('change', () => {
  userModalElement.classList.remove('hidden');
  body.classList.add('modal-open');
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

//закрыть модальное окно
function closeUserModal() {
  userModalElement.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUploadInput.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
  pristine.reset();
}

//при нажатии Esc закрывается модальное окно
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

//закрыть модальное окно по кнопке Закрыть
if (buttonModalClose) {
  buttonModalClose.addEventListener('click', () => {
    closeUserModal();
  });
  document.addEventListener('keydown', onDocumentKeydown);
}

pristine.addValidator(
  inputHashtags,
  validateHashtags,
  'Введён невалидный хэш-тег',
  1,
  true
);

pristine.addValidator(
  inputHashtags,
  validateCountWords,
  `Количество хэш-тегов не должно быть больше ${COUNT_HASHTAGS}`,
  2,
  true
);

pristine.addValidator(
  inputHashtags,
  validateDuplicateWords,
  'Хэш-теги не должны повторяться',
  3,
  true
);

pristine.addValidator(
  inputDescription,
  validateTextLength,
  `Максимальная длина ${MAX_DESCRIPTION} символов`,
  4,
  true);

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
