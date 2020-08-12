import {TASK_COUNT, TASK_COUNT_PER_STEP, RENDER_POSITION} from "./const";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import BoardView from "./view/board";
import TasksView from "./view/tasks";
import SortingsView from "./view/sortings";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import LoadMoreButtonView from "./view/load-more-button";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderElement} from "./utils";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const boardComponent = new BoardView();
const tasksComponent = new TasksView();

renderElement(siteHeaderElement, new MenuView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, boardComponent.getElement(), RENDER_POSITION.BEFOREEND);
renderElement(boardComponent.getElement(), tasksComponent.getElement(), RENDER_POSITION.BEFOREEND);
renderElement(boardComponent.getElement(), new SortingsView().getElement(), RENDER_POSITION.AFTERBEGIN);

const renderTask = (tasksElement, task) => {
  const taskComponent = new TaskView(task);

  renderElement(tasksElement, taskComponent.getElement(), RENDER_POSITION.BEFOREEND);
};


for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(tasksComponent.getElement(), tasks[i]);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  const loadMoreButtonComponent = new LoadMoreButtonView();
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RENDER_POSITION.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTask(tasksComponent.getElement(), task));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
