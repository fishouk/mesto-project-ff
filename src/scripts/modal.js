import { addCardPopup, editProfilePopup } from './index.js';

console.log(addCardPopup, editProfilePopup);

// Функция для обработки нажатия клавиши Esc
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Функция для открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  // Добавляем обработчик нажатия клавиши Esc
  document.addEventListener('keydown', handleEscapeKey);
}

// Функция для закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  // Удаляем обработчик нажатия клавиши Escape
  document.removeEventListener('keydown', handleEscapeKey);
}

// Функция для закрытия модального окна по клику на оверлей
function closeModalOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Функция для инициализации модальных окон
export function initModals() {
  const popups = document.querySelectorAll('.popup');
  
  popups.forEach((popup) => {
    popup.addEventListener('click', closeModalOnOverlayClick);
    const closeButton = popup.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => closeModal(popup));
    }
  });
}

// Функция для инициализации кнопок открытия модальных окон
export function initModalTriggers() {
  const profileEditButton = document.querySelector('.profile__edit-button');
  
  // Кнопка редактирования профиля
  if (profileEditButton && editProfilePopup) {
    profileEditButton.addEventListener('click', () => {
      const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
      const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      
      if (nameInput && profileTitle) {
        nameInput.value = profileTitle.textContent;
      }
      if (descriptionInput && profileDescription) {
        descriptionInput.value = profileDescription.textContent;
      }
      
      openModal(editProfilePopup);
    });
  }
  
  // Кнопка добавления новой карточки
  const profileAddButton = document.querySelector('.profile__add-button');
  
  if (profileAddButton && addCardPopup) {
    profileAddButton.addEventListener('click', () => {
      const form = addCardPopup.querySelector('.popup__form');
      if (form) {
        form.reset();
      }
      
      openModal(addCardPopup);
    });
  }
}
