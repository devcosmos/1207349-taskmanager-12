import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";
import {renderElement, replace} from "../utils/render";
import {RenderPosition} from "../const";

export default class Task {
  constructor(tasksContainer) {
    this._tasksComponent = tasksContainer;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._handleEditClick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    renderElement(this._tasksComponent, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape`) {
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
