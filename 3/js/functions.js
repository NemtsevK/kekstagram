const checkLength = function (text, number) {
  return text.length <= number;
};

const isPalindrome = function (text) {
  const value = text.replaceAll(/\s/g, '').toLowerCase();
  let newString = '';
  for (let i = (value.length - 1); i >= 0; i--) {
    const symbol = value[i];
    newString += symbol;
  }
  return value === newString;
};

const getDigit = function (text) {
  let newString = '';

  if (!isNaN(text)) {
    text = text.toString();
  }

  for (let i = 0; i < text.length; i++) {
    const digit = parseInt(text[i], 10);
    if (!Number.isNaN(digit)) {
      newString += digit;
    }
  }
  return newString === '' ? NaN : newString;
};

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

getDigit('2023 год');
getDigit('ECMAScript 2022');
getDigit('1 кефир, 0.5 батона');
getDigit('агент 007');
getDigit('а я томат');
getDigit(2023);
getDigit(-1);
getDigit(1.5);
