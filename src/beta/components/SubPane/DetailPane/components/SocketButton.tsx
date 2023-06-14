import classNames from "classnames"
import React from "react"

import { useEdgesBySocketId } from "@/beta/services/node/edgeByNodeId"
import { useIsSelectedOperation } from "@/beta/services/select/select"
import Tooltip from "@/beta/view/atoms/Tooltop"
import { useFocus } from "@/beta/services/focus/focus"

export type SocketButtonProps = {
  children: string
  nodeId: string
  socketId: string
  className?: string
}

export const SocketButton: React.FC<SocketButtonProps> = ({
  children,
  nodeId,
  socketId,
  className,
}) => {
  // edge
  const edges = useEdgesBySocketId({ nodeId, socketId })
  const isOccupied = 0 < edges.length
  const edge = edges[0]

  // select operation
  const { putSelect } = useIsSelectedOperation()

  // focus operation
  const focus = useFocus()

  // handler
  const handleClick = () => {
    if (edge == null) {
      return
    }
    if (edge.to.id === nodeId) {
      putSelect({ type: "node", id: edge.from.id })
      focus(edge.from.id)
    } else {
      putSelect({ type: "node", id: edge.to.id })
      focus(edge.to.id)
    }
  }

  return (
    <Tooltip label="ブロックに移動">
      <button
        className={classNames(
          "mr-1 w-max rounded-full border px-3 py-0.5 text-xs font-bold transition",
          isOccupied
            ? "border-slate-600 bg-slate-600 text-white hover:shadow-card"
            : "border-slate-300 bg-white text-slate-400",
          className,
        )}
        onClick={handleClick}
        disabled={!isOccupied}
      >
        {children}
      </button>
    </Tooltip>
  )
}

export type SocketLabelProps = {
  className?: string
  children: string
}

export const SocketLabel: React.FC<SocketLabelProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames("text-xs font-bold text-slate-600", className)}>
      {children}
    </div>
  )
}
