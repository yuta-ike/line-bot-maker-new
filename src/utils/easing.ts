export const easeOutCubic = (x: number) => {
  return (1 - Math.pow(1 - Math.abs(x), 3)) * Math.sign(x)
}

export const easeInOutCubic = (x: number) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
