import { handleCardActions, startGame } from "./game.js";

/**
 * Обрабатывает событие клика по карточке.
 * @param {Event} event - Объект события click.
 */
export const handleClick = (event) => {
  // Получаем цель события (элемент, по которому произошел клик) и его родительский элемент.
  const eventTarget = event.target;
  const eventParent = eventTarget.parentElement;

  // Является ли цель события элемент с классом "card" и он еще не перевернут.
  const isCardAndNotFlipped =
    eventParent.classList.contains("card") &&
    !eventParent.classList.contains("flipped");

  isCardAndNotFlipped && handleCardActions(eventParent);

  // Является ли цель события кнопкой, которая не отключена.
  const isInitializedGame =
    eventTarget.nodeName === "BUTTON" &&
    !eventTarget.classList.contains("disabled");

  isInitializedGame && startGame();
};
