import React from "react"
import { useRecoilValue } from "recoil"

import { blockEdgeState } from "../../services/selector/blockEdge"

import { useGetPath } from "./getPath"

export type EdgeLineProps = {
  id: string
}

const EdgeLine: React.FC<EdgeLineProps> = ({ id }) => {
  const edge = useRecoilValue(blockEdgeState(id))

  const path = useGetPath(edge.from.pos, edge.to.pos)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute overflow-visible"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={edge.from.color} />
          <stop offset="100%" stopColor={edge.to.color} />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="pointer-events-auto cursor-pointer"
      />
      <path
        d={path}
        fill="none"
        className="pointer-events-none stroke-[4px] transition-[stroke,stroke-width]"
        // stroke="url(#gradient)"
        stroke={edge.from.color}
        strokeDashoffset={10}
      />
    </svg>
  )
}

export default EdgeLine
