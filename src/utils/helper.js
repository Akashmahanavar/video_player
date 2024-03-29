export const secToMin = (sec) => {
  const min = Math.floor(sec / 60);
  const secRemain = Math.floor(sec % 60);
  return {
    min: String(min).padStart(2, "0"),
    sec: String(secRemain).padStart(2, "0"),
  };
};
