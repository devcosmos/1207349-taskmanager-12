import {RENDER_POSITION, TASK_COUNT_PER_STEP, SORT_TYPE} from "../const";
import BoardView from "../view/board";
import TasksView from "../view/tasks";
import SortingsView from "../view/sortings";
import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";
import LoadMoreButtonView from "../view/load-more-button";
import NoTaskView from "../view/no-task.js";
import {renderElement, remove, replace} from "../utils/render";
import {sortTaskUp, sortTaskDown} from "../utils/task";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._currentSortType = SORT_TYPE.DEFAULT;

    this._boardComponent = new BoardView();
    this._tasksComponent = new TasksView();
    this._noTaskComponent = new NoTaskView();
    this._sortingsComponent = new SortingsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    this._sourcedBoardTasks = boardTasks.slice();

    renderElement(this._boardContainer, this._boardComponent, RENDER_POSITION.BEFOREEND);
    renderElement(this._boardComponent, this._tasksComponent, RENDER_POSITION.BEFOREEND);

    this._renderBoard();
  }

  _renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape`) {
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    renderElement(this._tasksComponent, taskComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTask() {
    renderElement(this._boardComponent, this._noTaskComponent, RENDER_POSITION.AFTERBEGIN);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SORT_TYPE.DATE_UP:
        this._boardTasks.sort(sortTaskUp);
        break;
      case SORT_TYPE.DATE_DOWN:
        this._boardTasks.sort(sortTaskDown);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearTaskList();
    this._renderTaskList();

  }

  _renderSortings() {
    renderElement(this._boardComponent, this._sortingsComponent, RENDER_POSITION.AFTERBEGIN);
    this._sortingsComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._boardComponent, this._loadMoreButtonComponent, RENDER_POSITION.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearTaskList() {
    this._tasksComponent.getElement().innerHTML = ``;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _renderTaskList() {
    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTask();
      return;
    }

    this._renderSortings();
    this._renderTaskList();
  }
}
