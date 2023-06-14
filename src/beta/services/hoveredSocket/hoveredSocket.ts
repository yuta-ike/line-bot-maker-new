import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil"

export type HoveredSocket = {
  nodeId: string
  socketId: string
}

export const hoveredSocketState = atom<HoveredSocket | null>({
  key: "atom/hoveredSocket",
  default: null,
})

export const useSetHoveredSocket = () => useSetRecoilState(hoveredSocketState)
export const useHoveredSocket = () => useRecoilValue(hoveredSocketState)

export const isHoveredSocketState = selectorFamily({
  key: "selector/isHoveredSocket",
  get:
    ({ nodeId, socketId }: { socketId: string; nodeId: string }) =>
    ({ get }) => {
      const hoveredSocket = get(hoveredSocketState)
      if (hoveredSocket == null) {
        return false
      }
      return (
        hoveredSocket.socketId === socketId && hoveredSocket.nodeId === nodeId
      )
    },
})
export const useIsHoveredSocket = (socket: {
  socketId: string
  nodeId: string
}) => useRecoilValue(isHoveredSocketState(socket))
