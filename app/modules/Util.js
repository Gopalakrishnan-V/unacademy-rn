export const getCondensedNumber = num => {
  if (num < 1000) {
    return num + "";
  } else if (num < 1000000) {
    return Math.round(num / 1000) + "K";
  } else if (num < 1000000000) {
    return Math.round(num / 1000000) + "M";
  } else {
    return num + "";
  }
};
