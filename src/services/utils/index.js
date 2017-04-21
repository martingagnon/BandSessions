export const getTimeString = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);

  const hoursStart = 11;
  const length = 8;
  return date.toISOString().substr(hoursStart, length);
};
