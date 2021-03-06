import AbstractView from "./abstract";

export const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
