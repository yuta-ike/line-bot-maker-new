import { selector, useRecoilValue } from "recoil"

import { selectedElementIdsState } from "@/beta/services/select/selectedElement"
import { nodeState } from "@/beta/services/node/node"
import { edgeState } from "@/beta/services/atoms/edge"
import { nodeModelState } from "@/beta/services/nodeModel/nodeModel"

const selectedElementsState = selector({
  key: "atoms/selectedElements",
  get: ({ get }) => {
    const ids = get(selectedElementIdsState)
    return [...ids].map((id) => {
      if (id.type === "node") {
        const node = get(nodeState(id.id))
        return {
          type: "node" as const,
          node: {
            ...node,
            model: get(nodeModelState(node.modelId)),
          },
        }
      }
      if (id.type === "socket") {
        const node = get(nodeState(id.nodeId))
        return {
          type: "node" as const,
          node: {
            ...node,
            model: get(nodeModelState(node.modelId)),
          },
        }
      }
      if (id.type === "edge") {
        return {
          type: "edge" as const,
          edge: get(edgeState(id.id)),
        }
      }
    })
  },
})

export const useSelectedElementsState = () =>
  useRecoilValue(selectedElementsState)
