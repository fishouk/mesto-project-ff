import { openModal } from './modal.js';
import { initialCards } from './cards.js';

// DOM узлы
const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

// Функция создания карточки
export function addCard(card, deleteCallback, likeCallback, imageClickCallback) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = card?.link;
  cardImage.alt = card?.name;
  cardTitle.textContent = card?.name;
  
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });
  
  // Добавляем обработчик клика по кнопке лайка
  likeButton.addEventListener('click', () => {
    likeCallback(likeButton);
  });
  
  // Добавляем обработчик клика по изображению для открытия модального окна
  cardImage.addEventListener('click', () => {
    imageClickCallback(card?.link, card?.name);
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

// Функция обработки клика по изображению карточки
export function handleImageClick(imageSrc, imageAlt) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  if (popupImage && popupCaption) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    
    // Открываем модальное окно
    imagePopup.classList.add('popup_is-opened');
    openModal(imagePopup);
  }
}

// Выводим карточки на страницу
export function showInitialCards() {
  initialCards?.forEach((cardData) => {
    const cardElement = addCard(cardData, deleteCard, likeCard, handleImageClick);
    placesList.append(cardElement);
  });
}