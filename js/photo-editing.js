const SCALE_MIN = 25;
const SCALE_MAX = 100;

const modalUploadPhoto = document.querySelector('.img-upload__overlay');

const valueScale = modalUploadPhoto.querySelector('.scale__control--value');
const imagePreview = modalUploadPhoto.querySelector('.img-upload__preview > img');

const percentToNumber = (percent) => Number(percent.replace('%', ''));

const numberToPercent = (number) => `${number.toString()}%`;

const getPercentage = (percent, all) => (percent * all) / 100;

const onScaleSmallerClick = () => {
  const result = percentToNumber(valueScale.value) - 25;
  if (result >= SCALE_MIN) {
    const scaleValue = getPercentage(result, 1);
    imagePreview.style.transform = `scale(${scaleValue})`;
    valueScale.value = numberToPercent(result);
  }
};

const onScaleBiggerClick = () => {
  const result = percentToNumber(valueScale.value) + 25;
  if (result <= SCALE_MAX) {
    const scaleValue = getPercentage(result, 1);
    imagePreview.style.transform = `scale(${scaleValue})`;
    valueScale.value = numberToPercent(result);
  }
};

export {onScaleSmallerClick, onScaleBiggerClick};
