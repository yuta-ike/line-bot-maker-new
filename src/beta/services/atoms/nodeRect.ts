import { DefaultValue, atomFamily, selectorFamily } from "recoil"

import { originState, zoomState } from "./control"

export type NodeRect = {
  x: number
  y: number
  width: number
  sockets: {
    inputs: { x: number; y: number; width: number }[]
    outputs: { x: number; y: number; width: number }[]
  }
}

export const _nodeRectState = atomFamily<NodeRect, string>({
  key: "atom/node-rect",
  default: undefined,
})

export const nodeRectState = selectorFamily<NodeRect, string>({
  key: "selector/node-rect",
  get:
    (id) =>
    ({ get }) => {
      const rect = get(_nodeRectState(id))
      const origin = get(originState)
      const zoom = get(zoomState)
      return {
        x: (origin.x + rect.x) * zoom,
        y: (origin.y + rect.y) * zoom,
        width: rect.width * zoom,
        sockets: {
          inputs: rect.sockets.inputs.map((socket) => ({
            x: (origin.x + socket.x) * zoom,
            y: (origin.y + socket.y) * zoom,
            width: socket.width * zoom,
          })),
          outputs: rect.sockets.outputs.map((socket) => ({
            x: (origin.x + socket.x) * zoom,
            y: (origin.y + socket.y) * zoom,
            width: socket.width * zoom,
          })),
        },
      }
    },
  set:
    (id) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(_nodeRectState(id))
        return
      }
      const origin = get(originState)
      const zoom = get(zoomState)
      set(_nodeRectState(id), {
        x: Math.round(newValue.x / zoom) - origin.x,
        y: Math.round(newValue.y / zoom) - origin.y,
        width: Math.round(newValue.width / zoom),
        sockets: {
          inputs: newValue.sockets.inputs.map((socket) => ({
            x: Math.round(socket.x / zoom) - origin.x,
            y: Math.round(socket.y / zoom) - origin.y,
            width: Math.round(socket.width) / zoom,
          })),
          outputs: newValue.sockets.outputs.map((socket) => ({
            x: Math.round(socket.x / zoom) - origin.x,
            y: Math.round(socket.y / zoom) - origin.y,
            width: Math.round(socket.width / zoom),
          })),
        },
      })
    },
})
