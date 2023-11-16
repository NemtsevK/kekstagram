const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const modalElement = document.querySelector('.img-upload__overlay');
const scaleValue = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview > img');

const percentToNumber = (percent) => Number(percent.replace('%', ''));

const getPercentage = (percent, all) => (percent * all) / 100;

const numberToPercent = (number) => `${number.toString()}%`;

//уменьшить масштаб
const onScaleSmallerClick = () => {
  const result = percentToNumber(scaleValue.value) - SCALE_STEP;
  if (result >= SCALE_MIN) {
    const percentValue = getPercentage(result, 1);
    imageElement.style.transform = `scale(${percentValue})`;
    scaleValue.value = numberToPercent(result);
  }
};

// увеличить масштаб
const onScaleBiggerClick = () => {
  const result = percentToNumber(scaleValue.value) + SCALE_STEP;
  if (result <= SCALE_MAX) {
    const percentValue = getPercentage(result, 1);
    imageElement.style.transform = `scale(${percentValue})`;
    scaleValue.value = numberToPercent(result);
  }
};

const resetScale = () => {
  imageElement.style.transform = 'scale(1)';
  scaleValue.value = numberToPercent(SCALE_MAX);
};

export {numberToPercent, resetScale, onScaleSmallerClick, onScaleBiggerClick};
