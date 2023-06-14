import React, { useRef } from "react"

import {
  useUpdateOriginDirectional,
  useUpdateZoom,
} from "@/beta/services/atoms/control"

const CanvasControl = () => {
  const { updateVertical, updateHoritontal } = useUpdateOriginDirectional()
  const [zoom, updateZoom] = useUpdateZoom()
  const timerRef = useRef<NodeJS.Timer>()

  const handlePointerDown = (type: "horizontal" | "vertical", sign: 1 | -1) => {
    const updatePos = type === "horizontal" ? updateHoritontal : updateVertical
    const updater = (count: number) => {
      updatePos(sign * (1 - Math.pow(1 - Math.min(count / 10, 1), 2)) * 10)
      timerRef.current = setTimeout(() => updater(count + 1), 30)
    }
    updater(1)
  }

  const handlePointerUp = () => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
    }
  }

  return (
    <div className="absolute flex items-end max-w-full space-x-8 bottom-8 right-8">
      <div className="flex rounded bg-white/90 shadow-popper">
        <button
          className="flex-1 w-8 hover:bg-gray-400/10"
          onClick={() => updateZoom(-0.1)}
        >
          -
        </button>
        <div className="grid h-8 px-3 text-sm place-items-center border-x border-x-gray-200 tabular-nums">
          {Math.round(zoom * 100)}%
        </div>
        <button
          className="flex-1 w-8 hover:bg-gray-400/10"
          onClick={() => updateZoom(0.1)}
        >
          +
        </button>
      </div>
      <div className="flex rounded bg-white/90 shadow-popper">
        <button
          className="flex-1 px-2 py-2 transition border-r border-r-gray-200 hover:bg-gray-400/10"
          onPointerDown={() => handlePointerDown("horizontal", 1)}
          onPointerUp={handlePointerUp}
        >
          left
        </button>
        <div className="flex-col flex-1">
          <button
            className="flex-1 w-full px-5 py-2 text-center transition border-b border-b-gray-200 hover:bg-gray-400/10"
            onPointerDown={() => handlePointerDown("vertical", 1)}
            onPointerUp={handlePointerUp}
          >
            up
          </button>
          <button
            className="flex-1 w-full px-5 py-2 text-center transition hover:bg-gray-400/10"
            onPointerDown={() => handlePointerDown("vertical", -1)}
            onPointerUp={handlePointerUp}
          >
            down
          </button>
        </div>
        <button
          className="flex-1 px-2 py-2 transition border-l border-l-gray-200 hover:bg-gray-400/10"
          onPointerDown={() => handlePointerDown("horizontal", -1)}
          onPointerUp={handlePointerUp}
        >
          right
        </button>
      </div>
    </div>
  )
}

export default CanvasControl
