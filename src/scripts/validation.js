// Функция для отображения ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция для проверки валидности поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    // Если есть кастомное сообщение об ошибке для проверки по pattern
    if (inputElement.dataset.errorMessage && inputElement.validity.patternMismatch) {
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage, validationConfig);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Функция для проверки валидности всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция управления блокировкой кнопки
const setButtonDisable = (buttonElement, validationConfig, inputList, state) => {
  buttonElement.disabled = state;
  state ? buttonElement.classList.add(validationConfig.inactiveButtonClass) : buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => setButtonDisable(buttonElement, validationConfig, inputList, hasInvalidInput(inputList));

// Функция для установки слушателей событий на форму
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  // Проверяем состояние кнопки при загрузке страницы
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Основная функция включения валидации
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// Функция для очистки ошибок валидации
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  
  // Делаем кнопку неактивной
  setButtonDisable(buttonElement, validationConfig, inputList, true);
}; 