import {TASK_COUNT, TASK_COUNT_PER_STEP, RENDER_POSITION} from "./const";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import BoardView from "./view/board";
import SortingsView from "./view/sortings";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderTemplate, renderElement} from "./utils";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderElement(siteHeaderElement, new MenuView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new BoardView().getElement(), RENDER_POSITION.BEFOREEND);

const boardElement = siteMainElement.querySelector(`.board`);
const tasksElement = boardElement.querySelector(`.board__tasks`);

renderElement(boardElement, new SortingsView().getElement(), RENDER_POSITION.AFTERBEGIN);
renderElement(tasksElement, new TaskEditView(tasks[0]).getElement(), RENDER_POSITION.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderElement(tasksElement, new TaskView(tasks[i]).getElement(), RENDER_POSITION.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  renderTemplate(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  loadMoreButton.addEventListener(`click`, () => {
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderElement(tasksElement, new TaskView(task).getElement(), RENDER_POSITION.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
