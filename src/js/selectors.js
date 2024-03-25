/**
 * Объект, содержащий селекторы для элементов интерфейса.
 * @property {HTMLElement} boardContainer - Контейнер для игрового поля.
 * @property {HTMLElement} board - Игровое поле.
 * @property {HTMLElement} moves - Элемент для отображения количества ходов.
 * @property {HTMLElement} timer - Элемент для отображения времени.
 * @property {HTMLButtonElement} start - Кнопка начала игры.
 * @property {HTMLElement} win - Элемент для отображения сообщения о победе.
 */
export const SELECTORS = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
};
