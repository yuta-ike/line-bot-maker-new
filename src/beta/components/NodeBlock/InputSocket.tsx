import classNames from "classnames"
import React, { useLayoutEffect, useRef } from "react"
import { selectorFamily, useRecoilState, useRecoilValue } from "recoil"

import { useEdgeOperations } from "@/beta/services/atoms/edge"
import {
  useIsHoveredSocket,
  useSetHoveredSocket,
} from "@/beta/services/hoveredSocket/hoveredSocket"
import {
  isEqualElement,
  selectedElementIdsState,
} from "@/beta/services/select/selectedElement"
import { blockNodeState } from "@/beta/services/selector/blockNode"
import { useBlockSocket } from "@/beta/services/selector/blockSocket"
import { zoomState } from "@/beta/services/atoms/control"

import { useCounterNodeInfo } from "./inputSocketHook"

const isOtherSocketSelectedState = selectorFamily<
  boolean,
  { socketId: string; nodeId: string }
>({
  key: "atom/isOtherSocketSelected",
  get:
    (elm) =>
    ({ get }) => {
      const selectedElement = get(selectedElementIdsState)
      return [...selectedElement].some(
        (_elm) =>
          _elm.type === "socket" &&
          !isEqualElement(_elm, { ...elm, type: "socket" }),
      )
    },
})

export type InputSocketProps = {
  nodeId: string
  socketId: string
}

const InputSocket: React.FC<InputSocketProps> = ({ nodeId, socketId }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const zoom = useRecoilValue(zoomState)

  // node
  const [node, setNode] = useRecoilState(blockNodeState(nodeId))
  // socket
  const blockSocket = useBlockSocket({ type: "input", nodeId, socketId })

  // hover and select state
  const isHovered = useIsHoveredSocket({ nodeId, socketId })
  const isOtherSocketSelected = useRecoilValue(
    isOtherSocketSelectedState({ nodeId, socketId }),
  )
  const setHoveredSocket = useSetHoveredSocket()

  // counter node
  const counterNodeInfo = useCounterNodeInfo({ nodeId, socketId })

  // Program operation
  const { addEdge } = useEdgeOperations()

  useLayoutEffect(() => {
    const elm = ref.current
    if (elm == null) {
      return
    }
    const boundingRect = elm.getBoundingClientRect()
    const socket = {
      x: boundingRect.x - node.rect.x * zoom,
      y: 0,
      width: boundingRect.width,
    }

    setNode((node) => {
      const inputs = [...node.rect.sockets.inputs]
      inputs[blockSocket.index] = socket

      return {
        ...node,
        rect: {
          ...node.rect,
          sockets: {
            ...node.rect.sockets,
            inputs,
          },
        },
      }
    })
  }, [blockSocket.index, node.rect.x, node.rect.y, setNode, socketId, zoom])

  return (
    <div
      ref={ref}
      data-state={counterNodeInfo != null ? "occupied" : ""}
      className={classNames(
        "absolute h-5 w-5 -translate-x-1/2 cursor-none rounded-full border-[3px] border-white bg-block transition",
        "hover:scale-105 hover:border-[var(--self-socket-color)] hover:bg-white",
        "data-occupied:border-socket data-occupied:bg-white",
      )}
      style={{
        "--socket-color": counterNodeInfo?.color ?? "var(--color-accent)",
        "--self-socket-color": node.model.body.accentColor,
        top: -10,
        left: `${
          Math.round(100 / (node.model.sockets.input.length + 1)) *
          (blockSocket.index + 1)
        }%`,
      }}
    >
      <div
        className={classNames(
          "absolute -inset-3 rounded-full border-2 border-dashed border-red-300",
          isHovered && isOtherSocketSelected
            ? "animate-spin-slow opacity-100"
            : "opacity-0",
        )}
        onPointerEnter={() => setHoveredSocket({ nodeId, socketId })}
        onPointerLeave={() => setHoveredSocket(null)}
        onPointerUp={() => {
          if (isOtherSocketSelected) {
            addEdge({
              nodeId,
              socketId,
              type: "string",
            })
          }
        }}
      />
    </div>
  )
}

export default InputSocket
