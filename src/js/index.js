const EMOJIS = ["🥑", "🍇", "🍒", "🌽", "🥕", "🍉", "🥔", "🍌", "🥭", "🍍"];

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки.
 * @returns {strings[]} - Перемешанный массив с данными.
 */
function shuffleAndPickRandom(items) {
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
 * Состояние игры
 * @property {boolean} isGameStarted - Игра началась или нет.
 * @property {number} totalTime - Общее время в игре.
 * @property {number} flippedCards - Количество перевернутых карточек.
 * @property {number} totalFlips - Общее количество перевернутых карточек.
 */
const STATE = {
  isGameStarted: false,
  totalTime: 0,
  flippedCards: 0,
  totalFlips: 0,
};

/**
 * Контролы игры
 * @property {HTMLDivElement} boardContainer - Контейнер игрового поля.
 * @property {HTMLDivElement} board - Основное содержимое поля (4x4).
 * @property {HTMLDivElement} moves - Контрол для учета шагов.
 * @property {HTMLDivElement} timer - Контрол для учета времени.
 * @property {HTMLButtonElement} start - Кнопка для старта игры.
 */
const SELECTORS = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
};

/**
 * Генерация игрового поля
 */
const generateGame = () => {
  // Получение data атрибута
  const dimensions = SELECTORS.board.dataset.dimension;

  if (dimensions % 2 !== 0) {
    throw new Error("Размер игрового поля должен быть четным!");
  }

  // Итерация по карточкам
  const cardsHTML = EMOJIS.map((emoji) => {
    return `
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
        </div>
    `;
  }).join("");

  // Вставка карточек в игровое поле
  SELECTORS.board.insertAdjacentHTML("beforeend", cardsHTML);
};

generateGame();

// Обработчик события клика по карточке
const CARDS = SELECTORS.board.children;

if (CARDS) {
  // HTMLCollection в массив
  [...CARDS].forEach((card) => {
    // добавление клика на отдельно взятую карточку
    card.addEventListener("click", (event) => {
      console.log(event.target);
    });
  });
}
