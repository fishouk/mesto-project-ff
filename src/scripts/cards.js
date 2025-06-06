const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function addCard(card, deleteCallback) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = card?.link;
  cardImage.alt = card?.name;
  cardTitle.textContent = card?.name;
  
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });
  
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
export function showInitialCards() {
  initialCards?.forEach((cardData) => {
    const cardElement = addCard(cardData, deleteCard);
    placesList.append(cardElement);
  });
}