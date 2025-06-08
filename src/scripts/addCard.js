import { closeModal } from './modal.js';
import { addCard, deleteCard, likeCard, handleImageClick } from './card.js';

// Находим форму в DOM
const formElement = document.querySelector('.popup_type_new-card .popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

// Находим контейнер для карточек
const placesList = document.querySelector('.places__list');

// Обработчик отправки формы
function handleFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значение полей nameInput и linkInput из свойства value
    const nameValue = nameInput.value;
    const linkValue = linkInput.value;

    // Создаем объект новой карточки
    const newCard = {
        name: nameValue,
        link: linkValue
    };

    // Создаем элемент карточки и добавляем в начало списка
    const cardElement = addCard(newCard, deleteCard, likeCard, handleImageClick);
    placesList.prepend(cardElement);
    
    // Закрываем модальное окно после сохранения
    const newCardPopup = document.querySelector('.popup_type_new-card');
    closeModal(newCardPopup);
    
    // Очищаем форму
    formElement.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием "submit" - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 