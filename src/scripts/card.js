// Функция создания карточки из шаблона
export function addCard(cardData, cardTemplate, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });
  
  likeButton.addEventListener('click', () => {
    likeCallback(likeButton);
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