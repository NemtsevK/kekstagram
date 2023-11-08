import {isEscapeKey} from './util.js';
import {COUNT_HASHTAGS, MAX_DESCRIPTION, validateHashtags, validateCountWords, validateDuplicateWords, validateTextLength} from './validation.js';
import {onScaleSmallerClick, onScaleBiggerClick, initEffect, resetEffect} from './photo-editing.js';

const body = document.querySelector('body');
const imageUploadInput = document.querySelector('.img-upload__input');
const modalUploadPhoto = document.querySelector('.img-upload__overlay');
const buttonScaleSmaller = modalUploadPhoto.querySelector('.scale__control--smaller');
const buttonScaleBigger = modalUploadPhoto.querySelector('.scale__control--bigger');
const buttonModalClose = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');

//Добавить изображение
imageUploadInput.addEventListener('change', () => {
  modalUploadPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  initEffect();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

//закрыть модальное окно
const closeUserModal = () => {
  if (!modalUploadPhoto.classList.contains('hidden')) {
    modalUploadPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
    imageUploadInput.value = '';
    inputHashtags.value = '';
    inputDescription.value = '';
    pristine.reset();
    resetEffect();
  }
};

//при нажатии Esc закрывается модальное окно
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== inputHashtags && document.activeElement !== inputDescription) {
    evt.preventDefault();
    closeUserModal();
  }
};

buttonScaleSmaller.addEventListener('click', onScaleSmallerClick);
buttonScaleBigger.addEventListener('click', onScaleBiggerClick);

//закрыть модальное окно по кнопке Закрыть
buttonModalClose.addEventListener('click', () => {
  closeUserModal();
});
document.addEventListener('keydown', onDocumentKeydown);

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
