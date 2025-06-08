import '../pages/index.css';

import { addCard, deleteCard, likeCard, handleImageClick, showInitialCards } from './card.js';
import { initModals, initModalTriggers, closeModal } from './modal.js';

// Находим элементы DOM
export const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
export const editProfilePopup = document.querySelector('.popup_type_edit');
export const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
export const addCardPopup = document.querySelector('.popup_type_new-card');

showInitialCards();

// Инициализируем модальные окна
initModals();
initModalTriggers();

// Находим поля формы в DOM
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardLinkInput = document.querySelector('.popup__input_type_url');

// Находим контейнер для карточек
const placesList = document.querySelector('.places__list');

// Обработчик отправки формы
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значение полей addCardNameInput и addCardLinkInput из свойства value
    const nameValue = addCardNameInput.value;
    const linkValue = addCardLinkInput.value;

    // Создаем объект новой карточки
    const newCard = {
        name: nameValue,
        link: linkValue
    };

    // Создаем элемент карточки и добавляем в начало списка
    const cardElement = addCard(newCard, deleteCard, likeCard, handleImageClick);
    placesList.prepend(cardElement);
    
    // Закрываем модальное окно после сохранения
    closeModal(addCardPopup);
    
    // Очищаем форму
    addCardForm.reset();
}

// Прикрепляем обработчик к форме:
addCardForm.addEventListener('submit', handleAddCardFormSubmit); 
// Находим поля формы в DOM
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileJobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей editProfileJobInput и editProfileNameInput из свойства value
    const nameValue = editProfileNameInput.value;
    const jobValue = editProfileJobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    
    // Закрываем модальное окно после сохранения
    closeModal(editProfilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием "submit" - «отправка»
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit); 