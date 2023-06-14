import { selectorFamily, useRecoilValue } from "recoil"

import { edgesByNodeIdState } from "@/beta/services/node/edgeByNodeId"
import { blockNodeState } from "@/beta/services/selector/blockNode"

const outputEdgeAccentColorSelector = selectorFamily({
  key: "selector/outputEdgeAccentColor",
  get:
    ({ nodeId, socketId }: { nodeId: string; socketId: string }) =>
    ({ get }) => {
      const edges = get(edgesByNodeIdState({ nodeId, socketId }))
      const edge = edges[0]
      if (edge == null) {
        return null
      }
      const oppositeNode = get(blockNodeState(edge.from.id))
      return oppositeNode.model.body.accentColor
    },
})

export const useCounterNodeInfo = (args: {
  nodeId: string
  socketId: string
}) => {
  const color = useRecoilValue(outputEdgeAccentColorSelector(args))
  if (color == null) {
    return null
  }
  return { color }
}
