const COUNT_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;
const REG_HASHTAG = /^(#(\p{sc=Latin}|\p{sc=Cyrillic}|[0-9]){1,19})?$/iu;


//проверка каждого хэш-тега на валидность
function validateHashtags(value) {
  const words = value.split(' ');
  let isValid = true;
  for(let i = 0; i < words.length; i++){
    if (!REG_HASHTAG.test(words[i])) {
      isValid = false;
      break;
    }
  }
  return isValid;
}

//проверка на кол-во слов
function validateCountWords(value){
  const hashtagsArray = value.split(' ');
  return hashtagsArray.length <= COUNT_HASHTAGS;
}

//проверка на повторения слов в предложении
function validateDuplicateWords(value) {
  const wordCount = {};
  const words = value.split(' ');
  let isValid = true;
  for(let i = 0; i < words.length; i++){
    const cleanWord = words[i].toLowerCase();
    if (wordCount[cleanWord]) {
      isValid = false;
      break;
    } else {
      wordCount[cleanWord] = 1;
    }
  }
  return isValid;
}

//проверка на длину текста
function validateTextLength(value) {
  return value.length <= MAX_DESCRIPTION;
}

export {COUNT_HASHTAGS, MAX_DESCRIPTION, validateHashtags, validateCountWords, validateDuplicateWords, validateTextLength};
