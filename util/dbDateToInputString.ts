const dbDateToInputString = (dateObj: any) => {
  const date = new Date(dateObj);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  const dateString = `${year}-${month}-${day}`;

  return dateString;
};

export default dbDateToInputString;
