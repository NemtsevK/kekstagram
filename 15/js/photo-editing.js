import {getMinRange, onChangeRadioEffects, initEffects, resetEffects} from './effects.js';
import {resetScale} from './scale.js';

const modalElement = document.querySelector('.img-upload__overlay');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const effectRadioButtons = modalElement.querySelectorAll('.effects__radio');

//инициализация редактирования эффектов
const initEditing = () => {
  initEffects();
  effectRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', function () {
      const type = this.value;
      const minRange = getMinRange(type);
      sliderElement.noUiSlider.set(minRange);
      onChangeRadioEffects(type);
    });
  });
};

//сброс значений эффектов
const resetEditing = () => {
  resetEffects();
  resetScale();
  sliderElement.noUiSlider.destroy();
};

export {initEditing, resetEditing};
