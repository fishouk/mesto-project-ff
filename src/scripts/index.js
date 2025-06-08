import '../pages/index.css';

import { showInitialCards } from './cards.js';
import { initModals, initModalTriggers } from './modal.js';

showInitialCards();

// Инициализируем модальные окна
initModals();
initModalTriggers();
