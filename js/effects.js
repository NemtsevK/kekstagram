import {convertNumberToPercent} from './scale.js';

const DEFAULT = 'none';

const modalElement = document.querySelector('.img-upload__overlay');
const effectValue = modalElement.querySelector('.effect-level__value');
const imageElement = modalElement.querySelector('.img-upload__preview > img');
const sliderContainerElement = modalElement.querySelector('.effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectRadioButtons = modalElement.querySelectorAll('.effects__radio');

const convertNumberToPixel = (number) => `${number.toString()}px`;

//показать/скрыть блок со слайдером
const setVisibleEffectLevel = (type) => {
  if (type === 'none') {
    if (!sliderContainerElement.classList.contains('hidden')) {
      sliderContainerElement.classList.add('hidden');
    }
  } else {
    if (sliderContainerElement.classList.contains('hidden')) {
      sliderContainerElement.classList.remove('hidden');
    }
  }
};

//получить минимальное значение у эффекта фото
const getMinRange = (type) => {
  let minRange;
  if (type === 'heat') {
    minRange = 1;
  } else {
    minRange = 0;
  }
  return minRange;
};

//получить максимальное значение у эффекта фото
const getMaxRange = (type) => {
  let maxRange;
  switch (type) {
    case 'marvin':
      maxRange = 100;
      break;
    case 'phobos':
    case 'heat':
      maxRange = 3;
      break;
    default:
      maxRange = 1;
  }
  return maxRange;
};

//получить значения шага у эффекта фото
const getStepRange = (type) => {
  let stepRange;
  if (type === 'marvin') {
    stepRange = 1;
  } else {
    stepRange = 0.1;
  }
  return stepRange;
};

//получить изменённый стиль фото
const getStyleImageElement = (type, valueEffect) => {
  let style;
  switch (type) {
    case 'none':
      style = 'none';
      break;
    case 'chrome':
      style = `grayscale(${valueEffect})`;
      break;
    case 'sepia':
      style = `sepia(${valueEffect})`;
      break;
    case 'marvin':
      style = `invert(${convertNumberToPercent(valueEffect)})`;
      break;
    case 'phobos':
      style = `blur(${convertNumberToPixel(valueEffect)})`;
      break;
    case 'heat':
      style = `brightness(${valueEffect})`;
      break;
  }
  return style;
};

//создать слайдер
const createSlider = (type) => {
  const minRange = getMinRange(type);
  const maxRange = getMaxRange(type);
  const stepRange = getStepRange(type);
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {
      range: {
        min: minRange,
        max: maxRange,
      },
      start: maxRange,
      step: stepRange,
      connect: 'lower',
      format: {
        to: (value) => Number(value),
        from: (value) => Number(value),
      },
    });
  }
};

//установить параметры слайдера noUiSlider
const setSliderOptions = (type) => {
  const minRange = getMinRange(type);
  const maxRange = getMaxRange(type);
  const stepRange = getStepRange(type);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minRange,
      max: maxRange
    },
    step: stepRange,
    start: maxRange
  });
};

//получение нового значений слайдера
const updateEffectSlider = (type) => {
  const valueEffect = sliderElement.noUiSlider.get();
  effectValue.value = valueEffect;
  imageElement.style.filter = getStyleImageElement(type, valueEffect);
};

//изменение радио-кнопки
const onRadioEffectsChange = (button) => {
  const type = button.value;
  const minRange = getMinRange(type);
  sliderElement.noUiSlider.set(minRange);
  setSliderOptions(type);
  setVisibleEffectLevel(type);
  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.on('update', () => updateEffectSlider(type));
};

//установка checked конкретной радио кнопке
const setEffectRadioButton = (type) => {
  effectRadioButtons.forEach((button) => {
    if (button.value === type) {
      button.checked = true;
    }
  });
};

//инициализация эффектов
const initEffects = () => {
  setVisibleEffectLevel(DEFAULT);
  createSlider(DEFAULT);
};

//сброс эффектов
const resetEffects = () => {
  const valueEffect = getMaxRange(DEFAULT);
  effectValue.value = valueEffect;
  imageElement.style.filter = getStyleImageElement(DEFAULT, valueEffect);
  setVisibleEffectLevel(DEFAULT);
  setEffectRadioButton(DEFAULT);
};

export {getMinRange, onRadioEffectsChange, initEffects, resetEffects};
