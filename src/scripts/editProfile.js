import { closeModal } from './modal.js';

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    
    // Закрываем модальное окно после сохранения
    const editPopup = document.querySelector('.popup_type_edit');
    closeModal(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием "submit" - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 