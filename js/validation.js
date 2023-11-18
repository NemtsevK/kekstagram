const COUNT_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;
const REG_HASHTAG = /^(#(\p{sc=Latin}|\p{sc=Cyrillic}|\d){1,19})?$/iu;
const REG_EXTRA_SPACES = /\s{2,}/g;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

//проверка каждого хэш-тега на валидность
const validateHashtags = (value) => {
  const words = value.split(' ');
  let isValid = true;
  for (let i = 0; i < words.length; i++) {
    if (!REG_HASHTAG.test(words[i])) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

//удалить пробелы в начале и в конце, а также два и более пробелов подряд
const removeExtraSpaces = (text) => {
  text = text.trim();
  return text.replace(REG_EXTRA_SPACES, ' ');
};

//проверка на кол-во слов
const validateCountWords = (text) => {
  const cleanedText = removeExtraSpaces(text);
  const hashtagsArray = cleanedText.split(' ');
  return hashtagsArray.length <= COUNT_HASHTAGS;
};

//проверка на повторения слов в предложении
const validateDuplicateWords = (text) => {
  const wordCount = {};
  const cleanedText = removeExtraSpaces(text);
  const words = cleanedText.split(' ');
  let isValid = true;
  for (let i = 0; i < words.length; i++) {
    const cleanWord = words[i].toLowerCase();
    if (wordCount[cleanWord]) {
      isValid = false;
      break;
    } else {
      wordCount[cleanWord] = 1;
    }
  }
  return isValid;
};

//проверка на длину текста
const validateTextLength = (value) => value.length <= MAX_DESCRIPTION;

//проверка на допустипый формат файла
const isValidFormatFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

export {COUNT_HASHTAGS, MAX_DESCRIPTION, validateHashtags, validateCountWords, validateDuplicateWords, validateTextLength, isValidFormatFile};
