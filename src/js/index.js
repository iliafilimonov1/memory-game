const EMOJIS = ["🥑", "🍇", "🍒", "🌽", "🥕", "🍉", "🥔", "🍌", "🥭", "🍍"];

/**
 * Объект, содержащий селекторы для элементов интерфейса.
 * @property {HTMLElement} boardContainer - Контейнер для игрового поля.
 * @property {HTMLElement} board - Игровое поле.
 * @property {HTMLElement} moves - Элемент для отображения количества ходов.
 * @property {HTMLElement} timer - Элемент для отображения времени.
 * @property {HTMLButtonElement} start - Кнопка начала игры.
 * @property {HTMLElement} win - Элемент для отображения сообщения о победе.
 */
const SELECTORS = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
};

/**
 * Объект состояния игры.
 * @property {boolean} isGameStarted - Флаг, указывающий, началась ли игра.
 * @property {number} flippedCards - Количество перевернутых карт в текущем ходе.
 * @property {number} totalFlips - Общее количество ходов.
 * @property {number} totalTime - Общее время игры.
 * @property {number} loop - Идентификатор интервала для отслеживания времени.
 */
const STATE = {
  isGameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки.
 * @returns {strings[]} - Перемешанный массив с данными.
 */
function shuffleAndPickRandom(items) {
  if (!items && Array.isArray(items)) {
    throw new Error("Передайте эмодзи в виде массива!");
  }

  // сортировка исходного массива в случайном порядке
  const sortedArr = items.sort(() => Math.random(items) - 0.5);

  // достаем из 10 элементов первые 8
  const dublicateArr = [...sortedArr].slice(0, 8);

  // из массива в 8 элементов, делаем 16
  const doubleArr = [...dublicateArr, ...dublicateArr];

  // сортировка массива из 16 элементов в случайном порядке
  const sortedDoubleArr = doubleArr.sort(() => Math.random(doubleArr) - 0.5);

  return sortedDoubleArr;
}

/**
 * Генерирует игровое поле.
 */
const generateGame = () => {
  // Получение data атрибута
  const dimensions = SELECTORS.board.dataset.dimension;

  if (dimensions % 2 !== 0)
    throw new Error("Размер игрового поля должен быть четным!");

  // Вызываем функцию перемешивания и получения случайной карточки для эмодзи
  const shuffleAndPickEmoji = shuffleAndPickRandom(EMOJIS);

  // Итерация по карточкам
  const cardsHTML = shuffleAndPickEmoji
    .map((emoji) => {
      return `
      <div class="card">
        <div class="card-front"></div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    })
    .join("");

  // Вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
};

/**
 * Начинает игру.
 */
const startGame = () => {
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
const mainCardActions = card => {
  !STATE.isGameStarted && startGame(); // Если игра еще не началась, запускаем игру.

  canFlip() && flip(card); // Переворачиваем карту, если возможно.

  increaseFlipCount(); // Увеличиваем счетчик перевернутых карт и общий счетчик ходов.

  isSecondCardFlipped() && checkMatch(); // Проверяем совпадение перевернутых карт (возвращаем в исходную позицию).

  isGameWon() && displayWinMessage(); // Если игрок выиграл, отображаем сообщение о победе.
};

/**
 * Увеличивает счетчик перевернутых карт и общий счетчик ходов.
 */
const increaseFlipCount = () => {
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
const canFlip = () => STATE.flippedCards <= 2;

/**
 * Переворачивает карту.
 * @param {HTMLElement} card - Карта для переворачивания.
 */
const flip = (card) => card.classList.add("flipped");

/**
 * Проверяет, перевернута вторая карта или нет.
 * @returns {boolean} - Да/нет.
 */
const isSecondCardFlipped = () => STATE.flippedCards === 2;

/**
 * Проверяет совпадение перевернутых карт.
 */
const checkMatch = () => {
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
const markMatched = (cards) => {
  cards.forEach(card => card.classList.add("matched"));

  STATE.flippedCards === 2 && resetFlipCount(); // Если карточки совпали, обнуляем счетчик.
};


/**
 * Переворачивает обратно все карты, которые не совпали, обнуляет счетчик.
 */
const flipBack = () => {
  const unmatchedCards = document.querySelectorAll(".card:not(.matched)");

  unmatchedCards.forEach((card) => card.classList.remove("flipped"));

  STATE.flippedCards = 0;
};

/**
 * Проверяет, выиграл игрок или нет.
 * @returns {boolean} - True, если игрок выиграл, иначе False.
 */
const isGameWon = () =>
  !document.querySelectorAll(".card:not(.flipped)").length;

/**
 * Отображает сообщение о победе.
 */
const displayWinMessage = () => {
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

/**
 * Обрабатывает событие клика по карточке.
 * @param {Event} event - Объект события click.
 */
const handleClick = (event) => {
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

/**
 * Вызов необходимых функций при загрузке страницы.
 */
document.addEventListener("DOMContentLoaded", () => {
  generateGame(); // Генерация поля игры
  document.addEventListener("click", handleClick); // Прикрепление обработчиков событий
});
