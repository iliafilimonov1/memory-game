import { mainCardActions, startGame } from "./game.js";

/**
 * Обрабатывает событие клика по карточке.
 * @param {Event} event - Объект события click.
 */
export const handleClick = event => {
  // Получаем цель события (элемент, по которому произошел клик) и его родительский элемент.
  const eventTarget = event.target;
  const eventParent = eventTarget.parentElement;

  // Цель события является ли элементом с классом "card" и он еще не перевернут.
  const hasCardClassAndNotFlipped = eventParent.classList.contains("card") && !eventParent.classList.contains("flipped");

  hasCardClassAndNotFlipped && mainCardActions(eventParent);

  // Цель события является ли кнопкой "button" и она не отключена.
  const isInitializedGame = eventTarget.nodeName === "BUTTON" && !eventTarget.classList.contains("disabled");

  isInitializedGame && startGame();
};
