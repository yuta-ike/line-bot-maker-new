import {
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil"

import { NodeModel } from "@/beta/models/NodeModel"
import { genId } from "@/utils/genId"

import { ProgramNode, nodeIdsState, nodeState } from "../node/node"
import { NodeRect, nodeRectState } from "../atoms/nodeRect"
import { nodeModelState } from "../nodeModel/nodeModel"
import { edgeState } from "../atoms/edge"
import { selectedElementState } from "../select/selectedElement"
import { edgesByNodeIdState } from "../node/edgeByNodeId"

export type BlockNode = {
  node: ProgramNode
  rect: NodeRect
  model: NodeModel
}

export const blockNodeState = selectorFamily<BlockNode, string>({
  key: "selector/blockNodeState",
  get:
    (id) =>
    ({ get }) => {
      const node = get(nodeState(id))
      const rect = get(nodeRectState(id))
      const model = get(nodeModelState(node.modelId))

      return {
        node,
        rect,
        model,
      }
    },
  set:
    (id) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(nodeRectState(id))
        reset(nodeState(id))
        return
      }

      const { rect, node } = newValue
      set(nodeState(id), node)
      set(nodeRectState(id), rect)
    },
})

export const blockNodesState = selector<BlockNode[]>({
  key: "selector/blockNodesState",
  get: ({ get }) => {
    const nodeIds = get(nodeIdsState)
    return [...nodeIds].map((id) => get(blockNodeState(id)))
  },
})

export const useBlockNodes = () => useRecoilValue(blockNodesState)
export const useBlockNode = (id: string) => useRecoilValue(blockNodeState(id))

export const useBlockNodeOperation = () => {
  const addNode = useRecoilCallback(
    ({ snapshot, set }) =>
      (
        node: Omit<ProgramNode, "id" | "extraProps">,
        pos?: { x?: number; y?: number },
      ) => {
        const id = genId()
        const model = snapshot
          .getLoadable(nodeModelState(node.modelId))
          .getValue()
        set(blockNodeState(id), {
          node: {
            id,
            ...node,
            extraProps: {},
          },
          model,
          rect: {
            x: pos?.x ?? 0,
            y: pos?.y ?? 0,
            width: 160,
            sockets: {
              inputs: [],
              outputs: [],
            },
          },
        })
        return id
      },
    [],
  )

  const updateNodePosition = useRecoilCallback(
    ({ set }) =>
      (id: string, pos: { x?: number; y?: number }) => {
        set(nodeRectState(id), (rect) => ({
          ...rect,
          x: pos.x ?? rect.x,
          y: pos.y ?? rect.y,
        }))
      },
    [],
  )

  const removeNode = useRecoilCallback(
    ({ snapshot, reset }) =>
      (id: string) => {
        reset(nodeRectState(id))
        reset(nodeState(id))
        reset(selectedElementState({ type: "node", id }))
        const edges = snapshot
          .getLoadable(edgesByNodeIdState({ nodeId: id }))
          .getValue()
        for (const edge of edges) {
          reset(edgeState(edge.id))
        }
      },
    [],
  )

  return { addNode, updateNodePosition, removeNode }
}

export const duplicateBlockNode = (blockNode: BlockNode) =>
  structuredClone(blockNode)
