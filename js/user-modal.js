import {arrayPhotos} from './picture.js';
import {isEscapeKey} from './util.js';

const userModalElement = document.querySelector('.big-picture');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const commentsList = userModalElement.querySelector('.social__comments');
const body = document.querySelector('body');
const socialCaption = userModalElement.querySelector('.social__caption');
const likesCount = userModalElement.querySelector('.likes-count');
const commentCount = userModalElement.querySelector('.social__comment-count');
const commentsLoader = userModalElement.querySelector('.comments-loader');
const commentShownCount = userModalElement.querySelector('.social__comment-shown-count');
const commentTotalCount = userModalElement.querySelector('.social__comment-total-count');

//каждой ссылке добавляется обработчик на клик
function addClickEvent(userModalOpenElements) {
  userModalOpenElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      openUserModal(arrayPhotos[index]);
    });
  });
}

//открыть модальное окно
function openUserModal(photoContent) {
  userModalElement.classList.remove('hidden');
  body.classList.add('modal-open');
  const picture = userModalElement.querySelector('.big-picture__img > img');
  picture.src = photoContent.url;
  picture.alt = photoContent.description;
  socialCaption.textContent = photoContent.description;
  likesCount.textContent = photoContent.likes;
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  commentShownCount.textContent = '2';
  const commentsArray = photoContent.comments;
  commentTotalCount.textContent = commentsArray.length.toString();
  commentsList.innerHTML = '';
  commentsArray.forEach((element) => {
    addComment(element);
  });
}

//добавить комментарий
function addComment(element) {
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
