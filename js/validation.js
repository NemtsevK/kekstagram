const COUNT_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;
const REG_HASHTAG = /^(#(\p{sc=Latin}|\p{sc=Cyrillic}|\d){1,19})?$/iu;

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

//проверка на кол-во слов
const validateCountWords = (value) => {
  const hashtagsArray = value.split(' ');
  return hashtagsArray.length <= COUNT_HASHTAGS;
};

//проверка на повторения слов в предложении
const validateDuplicateWords = (value) => {
  const wordCount = {};
  const words = value.split(' ');
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

export {COUNT_HASHTAGS, MAX_DESCRIPTION, validateHashtags, validateCountWords, validateDuplicateWords, validateTextLength};
