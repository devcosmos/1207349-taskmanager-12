import AbstractView from "./abstract";
import {SORT_TYPE} from "../const";

const createSortingsTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="${SORT_TYPE.DEFAULT}">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="${SORT_TYPE.DATE_UP}">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="${SORT_TYPE.DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sortings extends AbstractView {
  getTemplate() {
    return createSortingsTemplate();
  }
}
