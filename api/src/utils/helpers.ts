export const pickRandomElement = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const checkIfDateStringsAreIncludedInArrayOfDates = (
  datesToBeChecked: string[],
  dates: Date[],
) => {
  return datesToBeChecked.every(d =>
    dates.map(d => d.toLocaleDateString('en-CA')).includes(d),
  );
};
