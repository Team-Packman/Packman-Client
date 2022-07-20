export const calcMs = (index: number) => {
  const TICK = 30;
  if (index < 0.66 * TICK) {
    return 150;
  } else if (0.66 * TICK <= index && index < 0.77 * TICK) {
    return 300;
  } else if (0.77 * TICK <= index && index < 0.88 * TICK) {
    return 400;
  } else if (0.88 * TICK <= index && index < 28) {
    return 500;
  } else {
    return 1000;
  }
};
