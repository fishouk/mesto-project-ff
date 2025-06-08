import '../pages/index.css';

import { showInitialCards } from './card.js';
import { initModals, initModalTriggers } from './modal.js';
import './editProfile.js';
import './addCard.js';

showInitialCards();

// Инициализируем модальные окна
initModals();
initModalTriggers();
