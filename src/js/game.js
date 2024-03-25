import { SELECTORS } from "./selectors.js";
import { STATE } from "./state.js";
import { EMOJIS } from "./emojis.js";
import { shuffleAndPickRandom } from "./utils.js";
import { canFlip, flip, increaseFlipCount, isSecondCardFlipped, isGameWon, checkMatch, displayWinMessage } from './utils.js';

/**
 * Генерирует игровое поле.
 */
export const generateGame = () => {
  // Получение data атрибута
  const dimensions = SELECTORS.board.dataset.dimension;

  if (dimensions % 2 !== 0) throw new Error("Размер игрового поля должен быть четным!");

  // Вызываем функцию перемешивания и получения случайной карточки для эмодзи
  const shuffleAndPickEmoji = shuffleAndPickRandom(EMOJIS);

  // Итерация по карточкам
  const cardsHTML = shuffleAndPickEmoji
    .map(emoji => {
      return `
        <div class="card">
          <div class="card-back"></div>
          <div class="card-front">${emoji}</div>
        </div>
      `;
    }).join("");

  // Вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
};

/**
 * Начинает игру.
 */
export const startGame = () => {
  // Устанавливаем флаг, указывающий на начало игры.
  STATE.isGameStarted = true;

  // Отключаем кнопку начала игры.
  SELECTORS.start.classList.add("disabled");

  // Устанавливаем интервал, который будет обновлять время игры каждую секунду.
  STATE.loop = setInterval(() => {
    // Увеличиваем общее время игры на 1 секунду.
    STATE.totalTime++;

    // Обновляем информацию о ходах и времени на экране.
    SELECTORS.moves.innerText = `${STATE.totalFlips} ходов`;
    SELECTORS.timer.innerText = `время: ${STATE.totalTime} сек`;
  }, 1000);
};

/**
 * Основыне действия по переворачиванию карточки и обновления стейта.
 * @param {HTMLElement} card - Карта для переворачивания.
 */
export const mainCardActions = card => {
  !STATE.isGameStarted && startGame(); // Если игра еще не началась, запускаем игру.

  canFlip() && flip(card); // Переворачиваем карту, если возможно.

  increaseFlipCount(); // Увеличиваем счетчик перевернутых карт и общий счетчик ходов.

  isSecondCardFlipped() && checkMatch(); // Проверяем совпадение перевернутых карт (возвращаем в исходную позицию).

  isGameWon() && displayWinMessage(); // Если игрок выиграл, отображаем сообщение о победе.
};
