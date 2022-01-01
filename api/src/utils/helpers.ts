export const pickRandomElement = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
