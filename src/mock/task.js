import {COLORS} from "../const";
import {getRandomInteger} from "../utils";

const generateDescription = () => {
  const DESCRIPTION = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  const randomIndex = getRandomInteger(0, DESCRIPTION.length - 1);

  return DESCRIPTION[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger());

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 10;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateRepeating = () => {
  return {
    mo: Boolean(getRandomInteger()),
    tu: Boolean(getRandomInteger()),
    we: Boolean(getRandomInteger()),
    th: Boolean(getRandomInteger()),
    fr: Boolean(getRandomInteger()),
    sa: Boolean(getRandomInteger()),
    su: Boolean(getRandomInteger())
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeatingDays = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeatingDays,
    color: getRandomColor(),
    isFavorite: Boolean(getRandomInteger()),
    isArchive: Boolean(getRandomInteger())
  };
};
