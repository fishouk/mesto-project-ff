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
