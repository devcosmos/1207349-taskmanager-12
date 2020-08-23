import {TASK_COUNT, TASK_COUNT_PER_STEP, RENDER_POSITION} from "./const";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import BoardView from "./view/board";
import TasksView from "./view/tasks";
import SortingsView from "./view/sortings";
import TaskView from "./view/task";
import TaskEditView from "./view/task-edit";
import LoadMoreButtonView from "./view/load-more-button";
import NoTaskView from "./view/no-task.js";
import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderElement, replace, remove} from "./utils/render";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (tasksElement, task) => {
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

  renderElement(tasksElement, taskComponent, RENDER_POSITION.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const tasksComponent = new TasksView();

  renderElement(boardContainer, boardComponent, RENDER_POSITION.BEFOREEND);
  renderElement(boardComponent, tasksComponent, RENDER_POSITION.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    renderElement(boardComponent, new NoTaskView(), RENDER_POSITION.AFTERBEGIN);
    return;
  }

  renderElement(boardComponent, new SortingsView(), RENDER_POSITION.AFTERBEGIN);

  boardTasks
  .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
  .forEach((boardTask) => renderTask(tasksComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    const loadMoreButtonComponent = new LoadMoreButtonView();
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    renderElement(boardComponent, loadMoreButtonComponent, RENDER_POSITION.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(tasksComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

renderElement(siteHeaderElement, new MenuView(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters), RENDER_POSITION.BEFOREEND);
renderBoard(siteMainElement, tasks);
