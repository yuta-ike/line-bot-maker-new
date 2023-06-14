import { selector, selectorFamily } from "recoil"

import { ProgramEdge, edgeIdsState, edgeState } from "../atoms/edge"
import { zoomState } from "../atoms/control"

import { blockNodeState } from "./blockNode"

export type BlockEdge = ProgramEdge & {
  from: {
    color: string
    pos: {
      x: number
      y: number
    }
  }
  to: {
    color: string
    pos: {
      x: number
      y: number
    }
  }
}

export const blockEdgeState = selectorFamily<BlockEdge, string>({
  key: "selector/blockEdgeState",
  get:
    (id) =>
    ({ get }) => {
      const edge = get(edgeState(id))

      const fromNode = get(blockNodeState(edge.from.id))
      const toNode = get(blockNodeState(edge.to.id))

      const zoom = get(zoomState)

      const fromSocketIndex = fromNode.model.sockets.output.findIndex(
        ({ id }) => id === edge.from.socketId,
      )

      const toSocketIndex = toNode.model.sockets.input.findIndex(
        ({ id }) => id === edge.to.socketId,
      )

      const fromSocket = fromNode.rect.sockets.outputs[fromSocketIndex]
      const toSocket = toNode.rect.sockets.inputs[toSocketIndex]

      return {
        ...edge,
        from: {
          ...edge.from,
          color: fromNode.model.body.accentColor,
          pos:
            fromSocket != null
              ? {
                  x:
                    fromNode.rect.x +
                    fromSocket.x +
                    (fromSocket.width * zoom) / 2,
                  y: fromNode.rect.y + fromSocket.y - 10,
                }
              : {
                  x: fromNode.rect.x,
                  y: fromNode.rect.y,
                },
        },
        to: {
          ...edge.to,
          color: toNode.model.body.accentColor,
          pos:
            toSocket != null
              ? {
                  x: toNode.rect.x + toSocket.x + (toSocket.width * zoom) / 2,
                  y: toNode.rect.y - 10,
                }
              : {
                  x: toNode.rect.x,
                  y: toNode.rect.y,
                },
        },
      }
    },
})

export const blockEdgesState = selector<BlockEdge[]>({
  key: "selector/blockEdgesState",
  get: ({ get }) => {
    const edgeIds = get(edgeIdsState)
    return [...edgeIds].map((id) => get(blockEdgeState(id)))
  },
})
