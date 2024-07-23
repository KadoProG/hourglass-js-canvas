export const timeAsync = async (
  time: number,
  func: () => void
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      func();
      resolve();
    }, time);
  });
};
