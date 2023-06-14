import { selectorFamily, useRecoilValue } from "recoil"

import { blockNodeState } from "../selector/blockNode"

type SocketRectStateArgs = {
  nodeId: string
  socketId: string
  type: "input" | "output"
}

export const socketRectState = selectorFamily({
  key: "selector/socketRect",
  get:
    ({ nodeId, socketId, type }: SocketRectStateArgs) =>
    ({ get }) => {
      const node = get(blockNodeState(nodeId))
      const socketIndex = node.model.sockets[type].findIndex(
        (socket) => socket.id === socketId,
      )

      const rect = node.rect.sockets[`${type}s`][socketIndex]

      if (rect == null) {
        return null
      }

      return rect
    },
})

export const useSocketRect = (args: SocketRectStateArgs) => {
  const rect = useRecoilValue(socketRectState(args))
  return rect
}
