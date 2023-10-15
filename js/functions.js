//проверка длины строки
const checkLength = function (text, number) {
  return text.length <= number;
};

//является ли строка палиндромом
const isPalindrome = function (text) {
  const value = text.replaceAll(/\s/g, '').toLowerCase();
  let newString = '';
  for (let i = (value.length - 1); i >= 0; i--) {
    const symbol = value[i];
    newString += symbol;
  }
  return value === newString;
};

//получение числа из строки
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

checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

getDigit('2023 год'); // 2023
getDigit('ECMAScript 2022'); // 2022
getDigit('1 кефир, 0.5 батона'); // 105
getDigit('агент 007'); // 7
getDigit('а я томат'); // NaN
getDigit(2023); // 2023
getDigit(-1); // 1
getDigit(1.5); // 15

//Проверка входа числа в заданный диапазон
const isBetween = function (x, min, max) {
  return x >= min && x <= max;
};

//преобразовать время в миллисекунды (день выбирается сегодняшний)
const stringToDate = function (timeString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const regExTime = /^([0-2]?[0-9]):([0-5]?[0-9])$/;
  const regExTimeArr = regExTime.exec(timeString);
  let timeSecond = 0;
  if (regExTimeArr !== null) {
    const timeHour = regExTimeArr[1];
    const timeMinute = regExTimeArr[2];
    if (isBetween(timeHour, 0, 23) && isBetween(timeMinute, 0, 59)) {
      timeSecond = timeHour * 3600 * 1000 + timeMinute * 60 * 1000;
    }
  }
  return today.getTime() + timeSecond;
};

//входит ли встреча в диапазон рабочего времени
const checkTimeMeeting = function (startWorking, endWorking, startMeeting, periodMeeting) {
  const startWorkingMs = stringToDate(startWorking);
  const endWorkingMs = stringToDate(endWorking);
  const startMeetingMs = stringToDate(startMeeting);
  if (periodMeeting < 0) {
    periodMeeting = 0;
  }
  const endMeetingMs = startMeetingMs + periodMeeting * 60 * 1000;
  return isBetween(startMeetingMs, startWorkingMs, endWorkingMs) && isBetween(endMeetingMs, startWorkingMs, endWorkingMs);
};

checkTimeMeeting('08:00', '17:30', '14:00', 90); // true
checkTimeMeeting('8:0', '10:0', '8:0', 120); // true
checkTimeMeeting('08:00', '14:30', '14:00', 90); // false
checkTimeMeeting('14:00', '17:30', '08:0', 90); // false
checkTimeMeeting('8:00', '17:30', '08:00', 900); // false
