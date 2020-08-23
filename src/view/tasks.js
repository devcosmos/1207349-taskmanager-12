import AbstractView from "./abstract";

export const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractView {
  getTemplate() {
    return createTasksTemplate();
  }
}
