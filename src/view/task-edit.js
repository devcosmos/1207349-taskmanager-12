import {COLORS} from "../const";
import AbstractView from "./abstract";
import {isExpired, isRepeating, getFormattingDueDate} from "../utils/task";

const BLANK_TASK = {
  description: ``,
  dueDate: null,
  repeating: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  color: COLORS[0],
  isArchive: false,
  isFavorite: false
};

const createTaskEditDateTemplate = (dueDate) => {
  return (
    `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
    </button>

    ${dueDate !== null
      ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${getFormattingDueDate(dueDate)}"
          />
        </label>
      </fieldset>`
      : ``}
    `
  );
};

const createTaskEditRepeatingTemplate = (repeatingDays) => {
  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isRepeating(repeatingDays) ? `yes` : `no`}</span>
    </button>

    ${isRepeating(repeatingDays)
      ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${Object.entries(repeatingDays).map(([day, repeat]) => `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}"
            name="repeat"
            value="${day}"
            ${repeat ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}"
            >${day}</label
          >`).join(``)}
        </div>
      </fieldset>`
      : `` }
    `
  );
};

const createTaskEditColorsTemplate = (currentColor) => {

  return (
    `<div class="card__colors-wrap">
      ${COLORS.map((color) => `<input
        type="radio"
        id="color-${color}"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${currentColor === color ? `checked` : ``}
      />
      <label
        for="color-${color}"
        class="card__color card__color--${color}"
        >${color}</label
      >`).join(``)}
    </div>`
  );
};

const createTaskEditTemplate = (task) => {
  const {description, dueDate, repeatingDays, color} = task;

  const deadlineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const dateTemplate = createTaskEditDateTemplate(dueDate);
  const repeatingTemplate = createTaskEditRepeatingTemplate(repeatingDays);
  const colorsTemplate = createTaskEditColorsTemplate(color);

  return (
    `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                
                ${dateTemplate}

                ${repeatingTemplate}

              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              
              ${colorsTemplate}

            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractView {
  constructor(task = BLANK_TASK) {
    super();
    this._task = task;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
