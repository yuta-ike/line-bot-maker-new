import React, { useRef } from "react"
import { useRecoilValue } from "recoil"
import classNames from "classnames"

import { useSetPointerPos } from "@/utils/pointerPos"
import { originState, zoomState } from "@/beta/services/atoms/control"

import AreaSelect from "./SelectedAreaRect/AreaSelect"
import { useHandleWheelEvent } from "./WheelEvent/handleWheelEvent"
import EdgeDetector from "./EdgeDetector/EdgeDetector"

export type GroundProps = {
  children: React.ReactNode
  className?: string
}

const Ground: React.FC<GroundProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const canvasRef = useSetPointerPos()

  const origin = useRecoilValue(originState)
  const zoom = useRecoilValue(zoomState)

  const wheelRef = useHandleWheelEvent()

  return (
    <div
      id="editor-ground"
      className={classNames(
        "h-full overflow-hidden overscroll-none",
        className,
      )}
      ref={(elm) => {
        ref.current = elm
        canvasRef.current = elm
        wheelRef.current = elm
      }}
      style={{
        backgroundColor: "#fff",
        backgroundImage: "radial-gradient(#E6E6E6 10%, transparent 10%)",
        backgroundSize: "16px 16px",
        backgroundPosition: `${0 + origin.x}px ${0 + origin.y}px, ${
          16 + origin.x
        }px ${16 + origin.y}px`,
        transform: `scale(${Math.round(zoom * 100)}%)`,
        willChange: "transform",
      }}
    >
      <EdgeDetector />
      <AreaSelect canvasRef={ref} />
      {children}
    </div>
  )
}

export default Ground
