export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};

export const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  return getCurrentDate().getTime() > dueDate.getTime();
};

export const isExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  return getCurrentDate().getTime() === dueDate.getTime();
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const getFormattingDueDate = (date) => {
  return date.toLocaleString(`ru-RU`, {day: `numeric`, month: `long`});
};

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
