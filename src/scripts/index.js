import '../pages/index.css';

import { createCard } from './card.js';
import { initModals, closeModal, openModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, deleteCard as deleteCardAPI, likeCard as likeCardAPI, unlikeCard as unlikeCardAPI, updateAvatar } from './api.js';

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Переменная для хранения ID пользователя
let currentUserId = null;

// Переменная для хранения данных о карточке, которую нужно удалить
let cardToDelete = null;

// Находим все элементы DOM в глобальной области
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');
const addCardPopup = document.querySelector('.popup_type_new-card');
const editAvatarForm = document.querySelector('.popup_type_edit-avatar .popup__form');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const deleteCardForm = document.querySelector('.popup_type_delete-card .popup__form');
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileImageEditButton = document.querySelector('.profile__image-edit-button');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Поля формы редактирования профиля
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileJobInput = document.querySelector('.popup__input_type_description');

// Поля формы добавления карточки
const addCardNameInput = document.querySelector('.popup__input_type_card-name');
const addCardLinkInput = document.querySelector('.popup__input_type_url');

// Поле формы обновления аватара
const editAvatarInput = document.querySelector('.popup__input_type_avatar');

// Контейнер для карточек
export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template');

// Элементы модального окна с изображением
const popupImageType = document.querySelector('.popup_type_image');
const popupImage = popupImageType.querySelector('.popup__image');
const popupCaption = popupImageType.querySelector('.popup__caption');

// Функция для отображения информации о пользователе
function displayUserInfo(userData) {
  console.log({userData})
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  currentUserId = userData._id;
}

// Функция для отображения карточек
function displayCards(cardsData) {
  console.log({cardsData});
  cardsData.forEach((cardData) => {
    const cardElement = createCard(cardData, cardTemplate, handleDeleteCard, handleLikeCard, handleImageClick, currentUserId);
    placesList.append(cardElement);
  });
}

// Функция для обработки ошибок
function handleError(error) {
  console.error('Ошибка:', error);
}

// Функция для изменения текста кнопки при загрузке
function renderLoading(button, isLoading, loadingText = 'Сохранение...', originalText = 'Сохранить') {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = originalText;
    button.disabled = false;
  }
}

// Функция обработки удаления карточки
function handleDeleteCard(cardElement, cardId) {
  // Сохраняем данные о карточке для удаления
  cardToDelete = {
    element: cardElement,
    id: cardId
  };
  
  // Открываем попап подтверждения удаления
  openModal(deleteCardPopup);
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработки лайка карточки
function handleLikeCard(cardId, likeButton, likeCountElement) {
  // Проверяем, активен ли лайк
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  // Выбираем нужный API метод
  const likeMethod = isLiked ? unlikeCardAPI : likeCardAPI;
  
  likeMethod(cardId)
    .then((updatedCard) => {
      // Обновляем состояние кнопки лайка
      likeButton.classList.toggle('card__like-button_is-active');
      // Обновляем счетчик лайков данными с сервера
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch(handleError);
}

// Функция обработки клика по изображению карточки
export function handleImageClick(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  
  openModal(popupImageType);
}

// Инициализация страницы
function initPage() {
  // Загружаем данные пользователя и карточки одновременно
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
      // Сначала отображаем информацию о пользователе
      displayUserInfo(userData);
      // Затем отображаем карточки (уже зная ID пользователя)
      displayCards(cardsData);
    })
    .catch(handleError);
  
  // Инициализируем модальные окна
  initModals();
  
  // Включаем валидацию форм
  enableValidation(validationConfig);
}

// Запускаем инициализацию страницы
initPage();

// Обработчик кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Заполняем форму текущими данными профиля
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
  
  // Очищаем ошибки валидации
  clearValidation(editProfileForm, validationConfig);
  
  openModal(editProfilePopup);
});

// Обработчик кнопки редактирования аватара
profileImageEditButton.addEventListener('click', () => {
  // Очищаем форму
  editAvatarForm.reset();
  
  // Очищаем ошибки валидации и делаем кнопку неактивной
  clearValidation(editAvatarForm, validationConfig);
  
  openModal(editAvatarPopup);
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

    // Находим кнопку отправки
    const submitButton = addCardForm.querySelector('.popup__button');
    
    // Показываем состояние загрузки
    renderLoading(submitButton, true);

    // Отправляем данные на сервер
    addNewCard(nameValue, linkValue)
      .then((newCardData) => {
        // Создаем элемент карточки с данными с сервера и добавляем в начало списка
        const cardElement = createCard(newCardData, cardTemplate, handleDeleteCard, handleLikeCard, handleImageClick, currentUserId);
        placesList.prepend(cardElement);
        
        // Закрываем модальное окно
        closeModal(addCardPopup);
        
        // Очищаем форму
        addCardForm.reset();
        
        // Очищаем ошибки валидации и делаем кнопку неактивной
        clearValidation(addCardForm, validationConfig);
      })
      .catch(handleError)
      .finally(() => {
        // Возвращаем обычное состояние кнопки
        renderLoading(submitButton, false);
      });
}

// Обработчик отправки формы редактирования профиля
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значения полей из свойства value
    const nameValue = editProfileNameInput.value;
    const aboutValue = editProfileJobInput.value;
    
    // Находим кнопку отправки
    const submitButton = editProfileForm.querySelector('.popup__button');
    
    // Показываем состояние загрузки
    renderLoading(submitButton, true);

    // Отправляем данные на сервер
    updateUserInfo(nameValue, aboutValue)
      .then((updatedUserData) => {
        // Обновляем интерфейс с данными с сервера
        displayUserInfo(updatedUserData);
        // Закрываем модальное окно
        closeModal(editProfilePopup);
      })
      .catch(handleError)
      .finally(() => {
        // Возвращаем обычное состояние кнопки
        renderLoading(submitButton, false);
      });
}

// Обработчик отправки формы обновления аватара
function handleEditAvatarFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значение поля из свойства value
    const avatarValue = editAvatarInput.value;
    
    // Находим кнопку отправки
    const submitButton = editAvatarForm.querySelector('.popup__button');
    
    // Показываем состояние загрузки
    renderLoading(submitButton, true);

    // Отправляем данные на сервер
    updateAvatar(avatarValue)
      .then((updatedUserData) => {
        // Обновляем аватар с данными с сервера
        displayUserInfo(updatedUserData);
        // Закрываем модальное окно
        closeModal(editAvatarPopup);
      })
      .catch(handleError)
      .finally(() => {
        // Возвращаем обычное состояние кнопки
        renderLoading(submitButton, false);
      });
}

// Обработчик отправки формы подтверждения удаления карточки
function handleDeleteCardFormSubmit(evt) {
    evt.preventDefault();

    // Проверяем, что есть данные о карточке для удаления
    if (!cardToDelete) {
      return;
    }

    // Находим кнопку отправки
    const submitButton = deleteCardForm.querySelector('.popup__button');
    
    // Показываем состояние загрузки
    renderLoading(submitButton, true, 'Удаление...', 'Да');

    // Отправляем запрос на удаление
    deleteCardAPI(cardToDelete.id)
      .then(() => {
        // Удаляем карточку из DOM после успешного ответа сервера
        deleteCard(cardToDelete.element);
        // Закрываем модальное окно
        closeModal(deleteCardPopup);
        // Очищаем данные о карточке
        cardToDelete = null;
      })
      .catch(handleError)
      .finally(() => {
        // Возвращаем обычное состояние кнопки
        renderLoading(submitButton, false, 'Удаление...', 'Да');
      });
}

// Прикрепляем обработчики к формам
addCardForm.addEventListener('submit', handleAddCardFormSubmit); 
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);
deleteCardForm.addEventListener('submit', handleDeleteCardFormSubmit); 