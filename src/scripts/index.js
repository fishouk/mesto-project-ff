import '../pages/index.css';

import { addCard } from './card.js';
import { initialCards } from './cards.js';
import { initModals, closeModal, openModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Находим все элементы DOM в глобальной области
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const addCardPopup = document.querySelector('.popup_type_new-card');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Поля формы редактирования профиля
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileJobInput = document.querySelector('.popup__input_type_description');

// Поля формы добавления карточки
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardLinkInput = document.querySelector('.popup__input_type_url');

// Контейнер для карточек
export const placesList = document.querySelector('.places__list');

export const cardTemplate = document.querySelector('#card-template');

// Элементы модального окна с изображением
const popupImageType = document.querySelector('.popup_type_image');
const popupImage = popupImageType.querySelector('.popup__image');
const popupCaption = popupImageType.querySelector('.popup__caption');

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработки лайка карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция обработки клика по изображению карточки
export function handleImageClick(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  
  openModal(popupImageType);
}

// Функция для отображения начальных карточек
function showInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = addCard(cardData, cardTemplate, deleteCard, likeCard, handleImageClick);
    placesList.append(cardElement);
  });
}

showInitialCards();

// Инициализируем модальные окна
initModals();

// Включаем валидацию форм
enableValidation(validationConfig);

// Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Заполняем форму текущими данными профиля
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
  
  // Очищаем ошибки валидации
  clearValidation(editProfileForm, validationConfig);
  
  openModal(editProfilePopup);
});

// Обработчик кнопки добавления новой карточки
profileAddButton.addEventListener('click', () => {
  // Очищаем форму
  addCardForm.reset();
  
  // Очищаем ошибки валидации и делаем кнопку неактивной
  clearValidation(addCardForm, validationConfig);
  
  openModal(addCardPopup);
});

// Обработчик отправки формы добавления карточки
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значение полей из свойства value
    const nameValue = addCardNameInput.value;
    const linkValue = addCardLinkInput.value;

    // Создаем объект новой карточки
    const newCard = {
        name: nameValue,
        link: linkValue
    };

    // Создаем элемент карточки и добавляем в начало списка
    const cardElement = addCard(newCard, cardTemplate, deleteCard, likeCard, handleImageClick);
    placesList.prepend(cardElement);
    
    // Закрываем модальное окно после сохранения
    closeModal(addCardPopup);
    
    // Очищаем форму
    addCardForm.reset();
    
    // Очищаем ошибки валидации и делаем кнопку неактивной
    clearValidation(addCardForm, validationConfig);
}

// Обработчик отправки формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значения полей из свойства value
    const nameValue = editProfileNameInput.value;
    const jobValue = editProfileJobInput.value;

    // Вставляем новые значения с помощью textContent
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    
    // Закрываем модальное окно после сохранения
    closeModal(editProfilePopup);
}

// Прикрепляем обработчики к формам
addCardForm.addEventListener('submit', handleAddCardFormSubmit); 
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit); 