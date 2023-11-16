import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const modalPhotoBlock = document.querySelector('.big-picture');
const picture = modalPhotoBlock.querySelector('.big-picture__img > img');
const buttonModalClose = modalPhotoBlock.querySelector('.big-picture__cancel');
const commentsList = modalPhotoBlock.querySelector('.social__comments');
const socialCaption = modalPhotoBlock.querySelector('.social__caption');
const likesCount = modalPhotoBlock.querySelector('.likes-count');
const commentsLoader = modalPhotoBlock.querySelector('.comments-loader');
const commentShownCount = modalPhotoBlock.querySelector('.social__comment-shown-count');
const commentTotalCount = modalPhotoBlock.querySelector('.social__comment-total-count');
const COUNT_LOAD_COMMENT = 5;

//создать и добавить комментарий
const createComment = (element) => {
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
};

//получить кол-во отображаемых комментариев
const getStartComment = (startCommentIndex, endCommentIndex, commentsArray) => {
  let startComments = 0;
  commentsArray.forEach((element, index) => {
    if (index >= startCommentIndex && index < endCommentIndex) {
      createComment(element, index);
      startComments++;
    }
  });
  startComments += startCommentIndex;
  return startComments;
};

//убрать кнопку загрузить ещё
const closeCommentLoader = () => {
  if (!commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.add('hidden');
  }
};

//показать кнопку загрузить ещё
const showCommentLoader = () => {
  if (commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.remove('hidden');
  }
};

//вставить комментарии
const insertComments = (startCommentIndex, endCommentIndex, commentsArray) => {
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
};

//клик по кнопке загрузить ещё
const clickMoreComments = (startCommentIndex, endCommentIndex, commentsArray) => {
  commentsLoader.addEventListener('click', () => {
    startCommentIndex += COUNT_LOAD_COMMENT;
    endCommentIndex += COUNT_LOAD_COMMENT;
    insertComments(startCommentIndex, endCommentIndex, commentsArray);
  });
};

//открыть модальное окно
const openUserModal = (photoContent) => {
  const commentsArray = photoContent.comments;
  const startCommentIndex = 0;
  const endCommentIndex = startCommentIndex + COUNT_LOAD_COMMENT;
  modalPhotoBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  picture.src = photoContent.url;
  picture.alt = photoContent.description;
  socialCaption.textContent = photoContent.description;
  likesCount.textContent = photoContent.likes;
  commentsList.innerHTML = '';
  insertComments(startCommentIndex, endCommentIndex, commentsArray);
  clickMoreComments(startCommentIndex, endCommentIndex, commentsArray);
};

//каждой ссылке добавляется обработчик на клик
const addClickEvent = (photosContainer, photos) => {
  photosContainer.forEach((element, index) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      openUserModal(photos[index]);
    });
  });
};

//закрыть модальное окно
const closeUserModal = () => {
  if (!modalPhotoBlock.classList.contains('hidden')) {
    modalPhotoBlock.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

//при нажатии Esc закрывается модальное окно
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

buttonModalClose.addEventListener('click', closeUserModal);

document.addEventListener('keydown', onDocumentKeydown);

export {addClickEvent};
