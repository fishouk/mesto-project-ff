// Функция создания карточки из шаблона
export function addCard(cardData, cardTemplate, deleteCallback, likeCallback, imageClickCallback, currentUserId) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Отображаем количество лайков
  likeCount.textContent = cardData.likes.length;
  
  // Проверяем, лайкнул ли текущий пользователь эту карточку
  const isLiked = cardData.likes.some(like => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  // Сохраняем ID карточки в элементе для дальнейшего использования
  cardElement.dataset.cardId = cardData._id;
  
  // Показываем кнопку удаления только для карточек текущего пользователя
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }
  
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement, cardData._id);
  });
  
  likeButton.addEventListener('click', () => {
    likeCallback(cardData._id, likeButton, likeCount);
  });
  
  cardImage.addEventListener('click', () => {
    imageClickCallback(cardData.link, cardData.name);
  });
  
  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработки лайка карточки
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}