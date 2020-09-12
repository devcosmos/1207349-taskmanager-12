import {TASK_COUNT, RenderPosition} from "./const";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderElement} from "./utils/render";
import BoardPresenter from "./presenter/board";
import TasksModel from "./model/tasks";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);

renderElement(siteHeaderElement, new MenuView(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init();
