import {arrayPhotos} from './picture.js';
import {isEscapeKey} from './util.js';

const userModalElement = document.querySelector('.big-picture');

const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const commentsList = userModalElement.querySelector('.social__comments');

//каждой ссылке добавляется обработчик на клик
function addClickEvent(userModalOpenElements){
  userModalOpenElements.forEach((element, index)=>{
    element.addEventListener('click', () => {
      openUserModal(arrayPhotos[index]);
    });
  });
}

//открыть модальное окно
function openUserModal(photoContent) {
  userModalElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  const picture = userModalElement.querySelector('.big-picture__img > img');
  picture.src = photoContent.url;
  picture.alt = photoContent.description;
  userModalElement.querySelector('.social__caption').textContent = photoContent.description;
  userModalElement.querySelector('.likes-count').textContent = photoContent.likes;
  userModalElement.querySelector('.social__comment-count').classList.add('hidden');
  userModalElement.querySelector('.comments-loader').classList.add('hidden');
  userModalElement.querySelector('.social__comment-shown-count').textContent = '2';
  const commentsArray = photoContent.comments;
  userModalElement.querySelector('.social__comment-total-count').textContent = commentsArray.length.toString();
  commentsList.innerHTML = '';
  commentsArray.forEach((element) => {
    addComment(element);
  });
}

//добавить комментарий
function addComment(element) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = element.avatar;
  commentAvatar.alt = element.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentElement.appendChild(commentAvatar);
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = element.message;
  commentElement.appendChild(commentText);
  commentsList.appendChild(commentElement);
}

//закрыть модальное окно
function closeUserModal(){
  userModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

//при нажатии Esc закрывается модальное окно
const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

if(userModalCloseElement){
  userModalCloseElement.addEventListener('click', () => {
    closeUserModal();
  });
  document.addEventListener('keydown', onDocumentKeydown);
}

export {addClickEvent};
