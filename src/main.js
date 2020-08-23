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
import {renderElement} from "./utils/render";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (tasksElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    tasksElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    tasksElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
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

  renderElement(tasksElement, taskComponent.getElement(), RENDER_POSITION.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const tasksComponent = new TasksView();

  renderElement(boardContainer, boardComponent.getElement(), RENDER_POSITION.BEFOREEND);
  renderElement(boardComponent.getElement(), tasksComponent.getElement(), RENDER_POSITION.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    renderElement(boardComponent.getElement(), new NoTaskView().getElement(), RENDER_POSITION.AFTERBEGIN);
    return;
  }

  renderElement(boardComponent.getElement(), new SortingsView().getElement(), RENDER_POSITION.AFTERBEGIN);

  boardTasks
  .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
  .forEach((boardTask) => renderTask(tasksComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    const loadMoreButtonComponent = new LoadMoreButtonView();
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RENDER_POSITION.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(tasksComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

renderElement(siteHeaderElement, new MenuView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), RENDER_POSITION.BEFOREEND);
renderBoard(siteMainElement, tasks);
