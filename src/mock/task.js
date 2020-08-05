const generateTask = () => {
  return {
    description: ``,
    dueDate: null,
    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: ``,
    isFavorite: false,
    isArchive: false
  };
};
