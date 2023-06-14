import { useTmpEdge } from "@/beta/services/tmpEdge/tmpEdge"
import { useHoveredSocket } from "@/beta/services/hoveredSocket/hoveredSocket"

import { useGetPath } from "./getPath"

const TmpEdgeLine = () => {
  const tmpEdge = useTmpEdge()

  const hoveredSocket = useHoveredSocket()

  const path = useGetPath(
    tmpEdge?.from.pos ?? { x: 0, y: 0 },
    tmpEdge?.to.pos ?? { x: 0, y: 0 },
  )

  if (tmpEdge == null) {
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute overflow-visible pointer-events-none cursor-none"
    >
      <path
        d={path}
        fill="none"
        className="pointer-events-none stroke-[4px] transition-[stroke,stroke-width]"
        stroke={tmpEdge.from.color}
      />
      {hoveredSocket == null && (
        <circle
          cx={tmpEdge.to.pos.x}
          cy={tmpEdge.to.pos.y}
          r="8"
          strokeWidth={3}
          stroke={tmpEdge.from.color}
          fill="white"
        />
      )}
    </svg>
  )
}

export default TmpEdgeLine
