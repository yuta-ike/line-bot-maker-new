import { useMemo } from "react"

type Pos = { x: number; y: number }

export const getPath = (start: Pos, end: Pos) => {
  const delta = {
    x: end.x - start.x,
    y: end.y - start.y,
  }

  const path = `M ${start.x},${start.y} Q ${start.x} ${
    start.y + Math.abs(delta.y) / 4
  } ${start.x + delta.x / 2},${start.y + delta.y / 2} T ${start.x + delta.x} ${
    start.y + delta.y
  }`
  return path
}

export const useGetPath = (start: Pos, end: Pos) => {
  return useMemo(
    () =>
      getPath(
        {
          x: start.x,
          y: start.y,
        },
        {
          x: end.x,
          y: end.y,
        },
      ),
    [start.x, start.y, end.x, end.y],
  )
}
