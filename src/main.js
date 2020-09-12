import {TASK_COUNT, RenderPosition} from "./const";
import {generateTask} from "./mock/task";
import {render} from "./utils/render";
import TasksModel from "./model/tasks";
import FilterModel from "./model/filter.js";
import MenuView from "./view/menu";
import FilterPresenter from "./presenter/filter";
import BoardPresenter from "./presenter/board";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new MenuView(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();
