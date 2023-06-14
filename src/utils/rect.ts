import { useCallback, useState } from "react"

export type Rect = {
  x: number
  y: number
  width: number
  height: number
}

export const useRect = () => {
  const [rect, setRect] = useState<Rect | null>(null)

  const ref = useCallback((elm: HTMLElement | null) => {
    if (elm == null) {
      return
    }

    elm.getBoundingClientRect()

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]!
      const rect = entry.target.getBoundingClientRect()
      setRect({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      })
    })
    resizeObserver.observe(elm)
    return () => resizeObserver.disconnect()
  }, [])

  return [ref, rect] as const
}
