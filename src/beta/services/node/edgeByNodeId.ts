import { selectorFamily, useRecoilValue } from "recoil"

import { edgesState } from "../atoms/edge"

export type EdgesByNodeIdParams = {
  nodeId: string
  socketId?: string
}

export const edgesByNodeIdState = selectorFamily({
  key: "selector/edgeByNodeIdState",
  get:
    ({ nodeId, socketId }: EdgesByNodeIdParams) =>
    ({ get }) => {
      const edges = get(edgesState)
      return edges.filter((edge) => {
        if (socketId != null) {
          return (
            (edge.from.id === nodeId && edge.from.socketId === socketId) ||
            (edge.to.id === nodeId && edge.to.socketId === socketId)
          )
        } else {
          return edge.from.id === nodeId || edge.to.id === nodeId
        }
      })
    },
})

export const useEdgesByNodeId = (nodeId: string) => {
  const edges = useRecoilValue(edgesByNodeIdState({ nodeId }))
  return edges
}

export const useEdgesBySocketId = (args: EdgesByNodeIdParams) => {
  const edges = useRecoilValue(edgesByNodeIdState(args))
  return edges
}
