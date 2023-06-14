export const absMin = (target: number, isSmallerThan: number) => {
  return Math.sign(target) * easeOutCubic(Math.abs(target)) * isSmallerThan
}

const easeOutCubic = (x: number) => {
  return Math.exp(-0.25 / x)
}
