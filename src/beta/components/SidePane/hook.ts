import { selector, useRecoilValue } from "recoil"

import {
  SelectedNode,
  selectedElementIdsState,
} from "@/beta/services/select/selectedElement"
import { nodeState } from "@/beta/services/node/node"
import { nodeModelState } from "@/beta/services/nodeModel/nodeModel"

export const selectedNodesState = selector({
  key: "selector/selectedNodes",
  get: ({ get }) => {
    const selectedNodeIds = get(selectedElementIdsState)

    return [...selectedNodeIds]
      .filter((elm): elm is SelectedNode => elm.type === "node")
      .map((elm) => {
        const node = get(nodeState(elm.id))
        const model = get(nodeModelState(node.modelId))
        return { ...node, model }
      })
  },
})

export const useSelectedNodes = () => useRecoilValue(selectedNodesState)

export const isSomeNodeSelectedState = selector({
  key: "selector/isSomeNodeSelected",
  get: ({ get }) => {
    const selectedNodeIds = get(selectedElementIdsState)
    return [...selectedNodeIds].some((elm) => elm.type === "node")
  },
})
export const useIsSomeNodeSelected = () =>
  useRecoilValue(isSomeNodeSelectedState)
