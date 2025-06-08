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
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  // Добавляем обработчик нажатия клавиши Esc
  document.addEventListener('keydown', handleEscapeKey);
}

// Функция для закрытия модального окна
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  // Удаляем обработчик нажатия клавиши Esc
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
  const editPopup = document.querySelector('.popup_type_edit');
  
  // Кнопка редактирования профиля
  if (profileEditButton && editPopup) {
    profileEditButton.addEventListener('click', () => {
      const nameInput = editPopup.querySelector('.popup__input_type_name');
      const descriptionInput = editPopup.querySelector('.popup__input_type_description');
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      
      if (nameInput && profileTitle) {
        nameInput.value = profileTitle.textContent;
      }
      if (descriptionInput && profileDescription) {
        descriptionInput.value = profileDescription.textContent;
      }
      
      openModal(editPopup);
    });
  }
  
  // Кнопка добавления новой карточки
  const profileAddButton = document.querySelector('.profile__add-button');
  const newCardPopup = document.querySelector('.popup_type_new-card');
  
  if (profileAddButton && newCardPopup) {
    profileAddButton.addEventListener('click', () => {
      const form = newCardPopup.querySelector('.popup__form');
      if (form) {
        form.reset();
      }
      
      openModal(newCardPopup);
    });
  }
}

// Функция для открытия модального окна с изображением
export function openImageModal(imageSrc, imageAlt) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  if (popupImage && popupCaption) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    
    openModal(imagePopup);
  }
}
