import AbstractView from "./abstract";
import {isExpired, isRepeating, getFormattingDueDate} from "../utils/task";

const createTaskTemplate = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isFavorite} = task;

  const deadlineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--disabled`
    : ``;

  const favoriteClassName = isFavorite
    ? `card__btn--disabled`
    : ``;

  return (
    `<article class="card card--${color} ${deadlineClassName} ${repeatingClassName}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveClassName}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${favoriteClassName}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          ${dueDate !== null ? `<div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${getFormattingDueDate(dueDate)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>` : ``}
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _archiveClickHandler(evt) {
    evt.preventDefault();
    this._callback.archiveClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setArchiveClickHandler(callback) {
    this._callback.archiveClick = callback;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._archiveClickHandler);
  }
}
