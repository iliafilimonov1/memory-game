import { generateGame } from "./game.js";
import { handleClick } from "./event-hanlers.js";

document.addEventListener("DOMContentLoaded", () => {
  generateGame(); // Генерация поля игры
  document.addEventListener("click", handleClick); // Прикрепление обработчиков событий
});