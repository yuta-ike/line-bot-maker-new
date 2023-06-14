import classNames from "classnames"
import React, { useLayoutEffect, useRef } from "react"
import { useRecoilState, useRecoilValue } from "recoil"

import { useIsSelectedOperation } from "@/beta/services/select/select"
import { isElementSelectedState } from "@/beta/services/select/selectedElement"
import { blockNodeState } from "@/beta/services/selector/blockNode"
import { useBlockSocket } from "@/beta/services/selector/blockSocket"
import { useEdgesBySocketId } from "@/beta/services/node/edgeByNodeId"
import { absMin } from "@/utils/math"
import { usePointerPos } from "@/utils/pointerPos"
import { zoomState } from "@/beta/services/atoms/control"

export type OutputSocketProps = {
  nodeId: string
  socketId: string
}

const OutputSocket: React.FC<OutputSocketProps> = ({ nodeId, socketId }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const zoom = useRecoilValue(zoomState)

  // node
  const [node, setNode] = useRecoilState(blockNodeState(nodeId))
  const { putSelect } = useIsSelectedOperation()

  // socket
  const blockSocket = useBlockSocket({ type: "output", nodeId, socketId })

  // select
  const isSelected = useRecoilValue(
    isElementSelectedState({ type: "socket", nodeId, socketId }),
  )

  // edge
  const edges = useEdgesBySocketId({ nodeId, socketId })

  useLayoutEffect(() => {
    const elm = ref.current
    if (elm == null) {
      return
    }
    const socket = {
      x: elm.getBoundingClientRect().x - node.rect.x * zoom,
      y: 100,
      width: elm.getBoundingClientRect().width,
    }

    setNode((node) => {
      const outputs = [...node.rect.sockets.outputs]
      outputs[blockSocket.index] = socket

      return {
        ...node,
        rect: {
          ...node.rect,
          sockets: {
            ...node.rect.sockets,
            outputs,
          },
        },
      }
    })
  }, [blockSocket.index, node.rect.x, node.rect.y, setNode, socketId, zoom])

  const pointerPos = usePointerPos()

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        putSelect({
          type: "socket",
          nodeId: nodeId,
          socketId: socketId,
        })
        e.stopPropagation()
      }}
      data-state={isSelected ? "selected" : 0 < edges.length ? "occupied" : ""}
      className={classNames(
        "undraggable group relative z-50 select-none overflow-hidden rounded-full border-[3px] border-block bg-white/30 px-4 py-[3px] text-xs font-bold leading-none text-white transition",
        "hover:scale-105 hover:cursor-none hover:border-socket hover:bg-gray-50 hover:text-socket hover:shadow-md",
        "data-selected:!scale-105 data-selected:border-socket data-selected:bg-white data-selected:text-socket data-selected:shadow-md",
        "data-selected:shadow-md data-occupied:border-socket data-occupied:bg-white data-occupied:text-socket",
        "active:scale-95",
      )}
      style={{
        "--socket-color": node.model.body.accentColor,
        // @ts-ignore
        "--tw-translate-x":
          absMin(
            (pointerPos.x -
              node.rect.x -
              (blockSocket.rect?.x ?? 0) -
              (blockSocket.rect?.width ?? 0) / 2) *
              0.3,
            isSelected ? 1.5 : 6,
          ) + "px",
        "--tw-translate-y":
          absMin(
            (pointerPos.y - node.rect.y - (blockSocket.rect?.y ?? 0) + 12) *
              0.3,
            isSelected ? 1.5 : 6,
          ) + "px",
      }}
    >
      <div
        style={{
          left: pointerPos.x - node.rect.x - (blockSocket.rect?.x ?? 0),
          top: pointerPos.y - node.rect.y - (blockSocket.rect?.y ?? 0) + 28,
          background: `radial-gradient(circle at center, #dadada 0, #dadada 80%, transparent 100%)`,
        }}
        className="absolute -z-10 h-4 w-4 rounded-full"
      />
      {blockSocket.label}
    </div>
  )
}

export default OutputSocket
