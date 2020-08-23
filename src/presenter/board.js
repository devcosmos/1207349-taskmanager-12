import {RENDER_POSITION} from "../const";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import BoardView from "./view/board";
import TasksView from "./view/tasks";
import SortingsView from "./view/sortings";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import LoadMoreButtonView from "./view/load-more-button";
import NoTaskView from "./view/no-task.js";
import {replace} from "./utils/render";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._tasksComponent = new TasksView();
    this._noTaskComponent = new NoTaskView();
    this._sortingsComponent = new SortingsView();
    this._loadMoreButtonComponent =  new LoadMoreButtonView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
  }

  _renderBoard() {

  }

  _renderTask() {

  }

  _renderTasks() {

  }

  _renderNoTask() {

  }

  _renderSortings() {

  }

  _renderLoadMoreButton() {

  }
}
