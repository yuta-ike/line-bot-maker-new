import { selectorFamily } from "recoil"

import { nodeState } from "../node/node"
import { nodeModelState } from "../nodeModel/nodeModel"

type SocketStateArgs = {
  nodeId: string
  socketId: string
  type: "input" | "output"
}

export const socketState = selectorFamily({
  key: "selector/socket",
  get:
    ({ nodeId, socketId, type }: SocketStateArgs) =>
    ({ get }) => {
      const node = get(nodeState(nodeId))
      const model = get(nodeModelState(node.modelId))
      const index = model.sockets[type].findIndex(
        (socket) => socket.id === socketId,
      )
      const socket = model.sockets[type][index]

      if (socket == null) {
        throw new Error()
      }

      return { ...socket, index }
    },
})
