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

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return currentDate;
};
