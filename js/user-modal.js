import {arrayPhotos} from './picture.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const userModalElement = document.querySelector('.big-picture');
const picture = userModalElement.querySelector('.big-picture__img > img');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const commentsList = userModalElement.querySelector('.social__comments');
const socialCaption = userModalElement.querySelector('.social__caption');
const likesCount = userModalElement.querySelector('.likes-count');
const commentsLoader = userModalElement.querySelector('.comments-loader');
const commentShownCount = userModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = userModalElement.querySelector('.social__comment-total-count');
const COUNT_LOAD_COMMENT = 5;

//каждой ссылке добавляется обработчик на клик
function addClickEvent(userModalOpenElements) {
  userModalOpenElements.forEach((element, index) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      openUserModal(arrayPhotos[index]);
    });
  });
}

//открыть модальное окно
function openUserModal(photoContent) {
  const commentsArray = photoContent.comments;
  const startCommentIndex = 0;
  const endCommentIndex = startCommentIndex + COUNT_LOAD_COMMENT;
  userModalElement.classList.remove('hidden');
  body.classList.add('modal-open');
  picture.src = photoContent.url;
  picture.alt = photoContent.description;
  socialCaption.textContent = photoContent.description;
  likesCount.textContent = photoContent.likes;
  commentsList.innerHTML = '';

  insertComments(startCommentIndex, endCommentIndex, commentsArray);
  clickMoreComments(startCommentIndex, endCommentIndex, commentsArray);
}

//клик по кнопке загрузить ещё
function clickMoreComments(startCommentIndex, endCommentIndex, commentsArray) {
  commentsLoader.addEventListener('click', () => {
    startCommentIndex += COUNT_LOAD_COMMENT;
    endCommentIndex += COUNT_LOAD_COMMENT;
    insertComments(startCommentIndex, endCommentIndex, commentsArray);
  });
}

//вставить комментарии
function insertComments(startCommentIndex, endCommentIndex, commentsArray) {
  const commentCountAll = commentsArray.length;
  const startComments = getStartComment(startCommentIndex, endCommentIndex, commentsArray);
  const countCurrentComment = (startComments < endCommentIndex) ? startComments : endCommentIndex;
  commentTotalCount.textContent = commentCountAll.toString();
  commentShownCount.textContent = countCurrentComment.toString();
  if (commentCountAll <= endCommentIndex) {
    closeCommentLoader();
  } else {
    showCommentLoader();
  }
}

//получить кол-во отображаемых комментариев
function getStartComment(startCommentIndex, endCommentIndex, commentsArray) {
  let startComments = 0;
  commentsArray.forEach((element, index) => {
    if(index >= startCommentIndex && index < endCommentIndex){
      createComment(element, index);
      startComments++;
    }
  });
  startComments += startCommentIndex;
  return startComments;
}

//убрать кнопку загрузить ещё
function closeCommentLoader(){
  if (!commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.add('hidden');
  }
}

//показать кнопку загрузить ещё
function showCommentLoader(){
  if (commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.remove('hidden');
  }
}

//создать и добавить комментарий
function createComment(element) {
  const commentElement = document.createElement('li');
  const commentAvatar = document.createElement('img');
  const commentText = document.createElement('p');
  commentElement.classList.add('social__comment');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = element.avatar;
  commentAvatar.alt = element.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentElement.appendChild(commentAvatar);
  commentText.classList.add('social__text');
  commentText.textContent = element.message;
  commentElement.appendChild(commentText);
  commentsList.appendChild(commentElement);
}

//закрыть модальное окно
function closeUserModal() {
  userModalElement.classList.add('hidden');
  body.classList.remove('modal-open');
}

//при нажатии Esc закрывается модальное окно
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

if (userModalCloseElement) {
  userModalCloseElement.addEventListener('click', () => {
    closeUserModal();
  });
  document.addEventListener('keydown', onDocumentKeydown);
}

export {addClickEvent};
