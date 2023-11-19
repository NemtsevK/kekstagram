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
const commentTextInput = modalPhotoBlock.querySelector('.social__footer-text');

const START_COMMENT_INDEX = 0;
const COUNT_LOAD_COMMENT = 5;

let onCommentsLoaderClick;

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
const getStartComment = (comments) => {
  let startComments = 0;
  comments.array.forEach((element, index) => {
    if (index >= comments.start && index < comments.end) {
      createComment(element, index);
      startComments++;
    }
  });
  return startComments + comments.start;
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
const insertComments = (comments) => {
  const commentCountAll = comments.array.length;
  const nextStartComments = getStartComment(comments);
  const countCurrentComment = (nextStartComments < comments.end) ? nextStartComments : comments.end;
  commentTotalCount.textContent = commentCountAll.toString();
  commentShownCount.textContent = countCurrentComment.toString();
  if (commentCountAll <= comments.end) {
    closeCommentLoader();
  } else {
    showCommentLoader();
  }
};

//открыть модальное окно
const openUserModal = (photoContent) => {
  const comments = {
    start: START_COMMENT_INDEX,
    end: COUNT_LOAD_COMMENT,
    array: photoContent.comments
  };
  modalPhotoBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  picture.src = photoContent.url;
  picture.alt = photoContent.description;
  socialCaption.textContent = photoContent.description;
  likesCount.textContent = photoContent.likes;
  commentsList.innerHTML = '';
  insertComments(comments);

  onCommentsLoaderClick = () => {
    comments.start += COUNT_LOAD_COMMENT;
    comments.end += COUNT_LOAD_COMMENT;
    insertComments(comments);
  };
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

//каждой ссылке добавляется обработчик на клик
const addClickEvent = (photosContainer, photos) => {
  photosContainer.forEach((element, index) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      openUserModal(photos[index]);
    });
  });
};

//закрыть модальное окно
const closeUserModal = () => {
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  modalPhotoBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  commentTextInput.value = '';
};

//при нажатии Esc закрывается модальное окно
const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeUserModal();
  }
};

buttonModalClose.addEventListener('click', closeUserModal);

document.addEventListener('keydown', onDocumentKeydown);

export {addClickEvent};
