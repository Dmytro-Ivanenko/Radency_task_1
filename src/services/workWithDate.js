export const getCurrentDateTime = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  return currentDateTime;
};

export const extractDatesFromText = text => {
  const regex = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/g;
  const dates = text.match(regex);
  return dates ? dates.join(', ') : '';
};
