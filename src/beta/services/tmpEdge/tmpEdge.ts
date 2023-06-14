import { selector, useRecoilValue } from "recoil"

import { pointerPosState } from "@/utils/pointerPos"
import { DataType } from "@/beta/models/NodeModel"

import { nodeRectState } from "../atoms/nodeRect"
import { blockNodeState } from "../selector/blockNode"
import { selectedSocketState } from "../select/selectedElement"
import { hoveredSocketState } from "../hoveredSocket/hoveredSocket"
import { socketRectState } from "../atoms/socketRect"

export type TmpEdge = {
  from: {
    id: string
    socketId: string
  }
  type: DataType
}

export const tmpEdgeStartPosState = selector({
  key: "selector/tmpEdgeStartPos",
  get: ({ get }) => {
    const startSocket = get(selectedSocketState)

    if (startSocket == null) {
      return null
    }

    const node = get(blockNodeState(startSocket.nodeId))
    const socketIndex = node.model.sockets.output.findIndex(
      (socket) => socket.id === startSocket.socketId,
    )

    const pos = node.rect.sockets.outputs[socketIndex]

    if (pos == null) {
      return null
    }

    return {
      type: "string",
      x: node.rect.x + pos.x + pos.width / 2,
      y: node.rect.y + pos.y - 10,
      color: node.model.body.accentColor,
    }
  },
})

const tmpEdgeEndPosState = selector({
  key: "selector/tmpEdgeEndPos",
  get: ({ get }) => {
    const pointerPos = get(pointerPosState)
    const hoveredSocket = get(hoveredSocketState)

    if (hoveredSocket != null) {
      const socketRect = get(
        socketRectState({ ...hoveredSocket, type: "input" }),
      )
      const nodeRect = get(nodeRectState(hoveredSocket.nodeId))
      if (socketRect != null) {
        return {
          x: nodeRect.x + socketRect.x + socketRect.width / 2,
          y: nodeRect.y + socketRect.y - 10,
          width: socketRect.width,
        }
      }
    }

    return pointerPos
  },
})

export const useTmpEdge = () => {
  const tmpEdge = useRecoilValue(tmpEdgeStartPosState)
  // const pos = usePointerPos()

  // When hovered on input socket
  // const hoveredSocket = useHoveredSocket()
  const endPos = useRecoilValue(tmpEdgeEndPosState)

  return tmpEdge == null
    ? null
    : {
        type: tmpEdge.type,
        from: {
          color: tmpEdge.color,
          pos: {
            x: tmpEdge.x,
            y: tmpEdge.y,
          },
        },
        to: { pos: endPos },
      }
}
