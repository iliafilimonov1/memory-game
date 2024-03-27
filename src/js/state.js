/**
 * Объект состояния игры.
 * @property {boolean} isGameStarted - Флаг, указывающий, началась ли игра.
 * @property {number} flippedCards - Количество перевернутых карт в текущем ходе.
 * @property {number} totalFlips - Общее количество ходов.
 * @property {number} totalTime - Общее время игры.
 * @property {number} loop - Идентификатор интервала для отслеживания времени.
 */
export const STATE = {
  isGameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};
