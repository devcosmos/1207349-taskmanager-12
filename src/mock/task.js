import {COLORS} from "../const";
import {getRandomInteger} from "../utils";

const DESCRIPTION = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const generateRandomDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTION.length - 1);

  return DESCRIPTION[randomIndex];
};

const generateRandomDate = () => {
  const maxDaysGap = 10;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateRandomRepeating = () => {
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

const generateRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = !!getRandomInteger()
    ? generateRandomDate()
    : null;

  const repeatingDays = dueDate === null
    ? generateRandomRepeating()
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
    description: generateRandomDescription(),
    dueDate,
    repeatingDays,
    color: generateRandomColor(),
    isFavorite: Boolean(getRandomInteger()),
    isArchive: Boolean(getRandomInteger())
  };
};
