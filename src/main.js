import {TASK_COUNT, RENDER_POSITION} from "./const";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderElement} from "./utils/render";
import BoardPresenter from "./presenter/board.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

renderElement(siteHeaderElement, new MenuView(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters), RENDER_POSITION.BEFOREEND);

boardPresenter.init(tasks);
