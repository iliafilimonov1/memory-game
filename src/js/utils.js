import { STATE } from "./state.js";
import { SELECTORS } from "./selectors.js";

/**
 * Перемешивает элементы массива.
 * @param {Array} array - Массив для перемешивания.
 * @returns {Array} - Перемешанный массив.
 */
export const shuffle = array => {
  // Создаем клон исходного массива, чтобы не менять его порядок.
  const clonedArray = [...array];

  // Начинаем цикл для перемешивания элементов массива.
  for (let index = clonedArray.length - 1; index > 0; index--) {
    /*
	  Math.random() генерирует случайное число в интервале от 0 до 1 (не включительно).
	  Умножив его на (index + 1), получаем случайное число в интервале от 0 до index + 1.
	  Math.floor округляет это число вниз до ближайшего целого, создавая целочисленный индекс от 0 до index.
		*/
    const randomIndex = Math.floor(Math.random() * (index + 1));

    // Сохраняем значение текущего элемента в переменной original.
    const original = clonedArray[index];

    // Заменяем текущий элемент на случайно выбранный элемент.
    clonedArray[index] = clonedArray[randomIndex];

    // Заменяем случайно выбранный элемент на оригинальный элемент.
    clonedArray[randomIndex] = original;
  }

  // Возвращаем перемешанный массив.
  return clonedArray;
};

/**
 * Выбирает случайные элементы из массива.
 * @param {Array} array - Исходный массив.
 * @param {number} items - Количество элементов для выбора.
 * @returns {Array} - Массив случайно выбранных элементов.
 */
export const pickRandom = (array, items) => {
  // Создаем клон исходного массива, чтобы не изменять его.
  const clonedArray = [...array];

  // Массив для хранения случайно выбранных элементов.
  const randomPicks = [];

  // Начинаем цикл для выбора случайных элементов.
  for (let index = 0; index < items; index++) {
    // Генерируем случайный индекс от 0 до длины оставшегося массива.
    const randomIndex = Math.floor(Math.random() * clonedArray.length);

    // Добавляем случайно выбранный элемент в массив randomPicks.
    randomPicks.push(clonedArray[randomIndex]);

    // Удаляем выбранный элемент из клонированного массива.
    clonedArray.splice(randomIndex, 1);
  }

  // Возвращаем массив случайно выбранных элементов.
  return randomPicks;
};

/**
 * Увеличивает счетчик перевернутых карт и общий счетчик ходов.
 */
export const increaseFlipCount = () => {
  STATE.flippedCards++;
  STATE.totalFlips++;
};

/**
 * Сбрасывает счетчик перевернутых карт.
 */
const resetFlipCount = () => STATE.flippedCards = 0;

/**
 * Проверяет, можно перевернуть карту или нет.
 * @returns {boolean} - Да/нет.
 */
export const canFlip = () => STATE.flippedCards <= 2;

/**
 * Переворачивает карту.
 * @param {HTMLElement} card - Карта для переворачивания.
 */
export const flip = card => card.classList.add("flipped");

/**
 * Проверяет, перевернута вторая карта или нет.
 * @returns {boolean} - Да/нет.
 */
export const isSecondCardFlipped = () => STATE.flippedCards === 2;

/**
 * Проверяет совпадение перевернутых карт.
 */
export const checkMatch = () => {
  const flippedCards = document.querySelectorAll(".flipped:not(.matched)");

  if (flippedCards[0].innerText === flippedCards[1].innerText) {
    markMatched(flippedCards);
  } else {
    setTimeout(() => {
      flipBack(); // Переворачиваем обратно все карты, которые не совпали.
    }, 1000);
  }
};

/**
 * Отмечает перевернутые карты как совпавшие.
 * @param {NodeList} cards - Перевернутые карты, которые совпали.
 */
export const markMatched = cards => {
  cards.forEach(card => card.classList.add("matched"));

  STATE.flippedCards === 2 && resetFlipCount(); // Если карточки совпали, обнуляем счетчик.
};

/**
 * Переворачивает обратно все карты, которые не совпали, обнуляет счетчик.
 */
export const flipBack = () => {
  const unmatchedCards = document.querySelectorAll(".card:not(.matched)");

  unmatchedCards.forEach(card => card.classList.remove("flipped"));

  STATE.flippedCards = 0;
};

/**
 * Проверяет, выиграл игрок или нет.
 * @returns {boolean} - Да/нет.
 */
export const isGameWon = () => !document.querySelectorAll(".card:not(.flipped)").length;

/**
 * Отображает сообщение о прохождении игры.
 */
export const displayWinMessage = () => {
  setTimeout(() => {
    SELECTORS.boardContainer.classList.add("flipped");

    SELECTORS.win.innerHTML = `
      <span class="win-text">
        Игра успешно пройдена!<br />
        количество шагов: <span class="highlight">${STATE.totalFlips}</span><br />
        Время в игре: <span class="highlight">${STATE.totalTime}</span> секунд
      </span>
    `;

    clearInterval(STATE.loop);
  }, 1000);
};