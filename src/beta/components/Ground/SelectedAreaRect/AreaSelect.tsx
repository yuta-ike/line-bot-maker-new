import React, { MutableRefObject, useEffect } from "react"
import { throttle } from "throttle-debounce"

import { useSelectArea } from "./selectArea"

export type AreaSelectProps = {
  canvasRef: MutableRefObject<HTMLElement | null>
}

const AreaSelect: React.FC<AreaSelectProps> = ({ canvasRef }) => {
  const [origin, selectArea, setPos, resetPos] = useSelectArea()

  useEffect(() => {
    if (origin == null) {
      return
    }
    const listener = throttle(50, (e: MouseEvent) => {
      setPos("end", e.pageX, e.pageY)
    })
    window.addEventListener("pointermove", listener)
    return () => window.removeEventListener("pointermove", listener)
  }, [origin, setPos])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas == null) {
      return
    }

    const listener = (e: PointerEvent) => {
      const isFiredInCanvas = (e.target as HTMLElement).isEqualNode(
        canvasRef.current,
      )
      if (!isFiredInCanvas) {
        return
      }
      setPos("start", e.pageX, e.pageY)
    }
    canvas.addEventListener("pointerdown", listener)
    return () => canvas.removeEventListener("pointerdown", listener)
  }, [canvasRef, setPos])

  useEffect(() => {
    const listener = () => {
      resetPos()
    }

    window.addEventListener("pointerup", listener)
    return () => window.removeEventListener("pointerup", listener)
  }, [resetPos])

  return (
    <div
      className="absolute rounded border border-orange-400 bg-orange-400/30"
      style={
        selectArea?.end == null
          ? undefined
          : {
              left: selectArea.start.x,
              top: selectArea.start.y,
              width: selectArea.end.x - selectArea.start.x,
              height: selectArea.end.y - selectArea.start.y,
            }
      }
    />
  )
}

export default AreaSelect
