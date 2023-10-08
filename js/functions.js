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
  for(let i = 0; i < text.length; i++) {
    const digit = parseInt(text[i], 10);
    if(!Number.isNaN(digit)) {
      newString += digit;
    }
  }
  return newString === '' ? NaN : newString;
};
