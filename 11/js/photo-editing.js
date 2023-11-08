const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT = 'none';

const modalElement = document.querySelector('.img-upload__overlay');
const scaleValue = modalElement.querySelector('.scale__control--value');
const effectValue = modalElement.querySelector('.effect-level__value');
const imageElement = modalElement.querySelector('.img-upload__preview > img');
const sliderContainerElement = modalElement.querySelector('.effect-level');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectRadioButtons = modalElement.querySelectorAll('.effects__radio');

const percentToNumber = (percent) => Number(percent.replace('%', ''));

const numberToPercent = (number) => `${number.toString()}%`;

const numberToPixel = (number) => `${number.toString()}px`;

const getPercentage = (percent, all) => (percent * all) / 100;

//уменьшить масштаб
const onScaleSmallerClick = () => {
  const result = percentToNumber(scaleValue.value) - 25;
  if (result >= SCALE_MIN) {
    const percentValue = getPercentage(result, 1);
    imageElement.style.transform = `scale(${percentValue})`;
    scaleValue.value = numberToPercent(result);
  }
};

// увеличить масштаб
const onScaleBiggerClick = () => {
  const result = percentToNumber(scaleValue.value) + 25;
  if (result <= SCALE_MAX) {
    const percentValue = getPercentage(result, 1);
    imageElement.style.transform = `scale(${percentValue})`;
    scaleValue.value = numberToPercent(result);
  }
};

//показать/скрыть блок сс слайдером
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
  switch (type) {
    case 'heat':
      minRange = 1;
      break;
    default:
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
  switch (type) {
    case 'marvin':
      stepRange = 1;
      break;
    default:
      stepRange = 0.1;
  }
  return stepRange;
};


//получить изменённый стиль фото
const getStyleimageElement = (type, valueEffect) => {
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
      style = `invert(${numberToPercent(valueEffect)})`;
      break;
    case 'phobos':
      style = `blur(${numberToPixel(valueEffect)})`;
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
  noUiSlider.create(sliderElement, {
    range: {
      min: minRange,
      max: maxRange,
    },
    start: maxRange,
    step: stepRange,
    connect: 'lower',
    format: {
      to:  (value) => Number(value),
      from:  (value) => Number(value),
    },
  });
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
  imageElement.style.filter = getStyleimageElement(type, valueEffect);
};

//изменение радио-кнопки
const onChangeRadioEffects = (type) => {
  setSliderOptions(type);
  setVisibleEffectLevel(type);
  sliderElement.noUiSlider.off('update');
  sliderElement.noUiSlider.on('update', () => {
    updateEffectSlider(type);
  });
};

const initEffect = () => {
  setVisibleEffectLevel(DEFAULT);
  createSlider(DEFAULT);

  effectRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', function () {
      const type = this.value;
      const minRange = getMinRange(type);
      sliderElement.noUiSlider.set(minRange);
      onChangeRadioEffects(type);
    });
  });
};

export {onScaleSmallerClick, onScaleBiggerClick, initEffect};
