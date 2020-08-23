import {RENDER_POSITION, TASK_COUNT_PER_STEP} from "../const";
import BoardView from "./view/board";
import TasksView from "./view/tasks";
import SortingsView from "./view/sortings";
import LoadMoreButtonView from "./view/load-more-button";
import NoTaskView from "./view/no-task.js";
import {renderElement, remove} from "./utils/render";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._tasksComponent = new TasksView();
    this._noTaskComponent = new NoTaskView();
    this._sortingsComponent = new SortingsView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    renderElement(this._boardContainer, this._boardComponent, RENDER_POSITION.BEFOREEND);
    renderElement(this._boardComponent, this._tasksComponent, RENDER_POSITION.BEFOREEND);

    this._renderBoard();
  }

  _renderTask() {
  
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => renderTask(this._tasksComponent.getElement(), boardTask));
  }

  _renderNoTask() {
    renderElement(this._boardComponent, this._noTaskComponent, RENDER_POSITION.AFTERBEGIN);
  }

  _renderSortings() {
    renderElement(this._boardComponent, this._sortingsComponent, RENDER_POSITION.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    renderElement(this._boardComponent, this._loadMoreButtonComponent, RENDER_POSITION.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      this._boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(this._tasksComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= this._boardTasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTask();
      return;
    }

    this._renderSortings();

    this._renderTasks(0, Math.min(this._boardTasks, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
