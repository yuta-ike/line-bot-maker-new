import {
  DefaultValue,
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import { useCallback } from "react"
import { CheckSuccess } from "@recoiljs/refine"
import { syncEffect } from "recoil-sync"

import { edgeState } from "../atoms/edge"

import { edgesByNodeIdState } from "./edgeByNodeId"

export type ProgramNode = {
  id: string
  modelId: string
  extraProps: Record<string, unknown>
}

const _nodeState = atomFamily<ProgramNode, string>({
  key: "atom/_node",
  default: undefined,
  effects: (nodeId) => [
    syncEffect({
      storeKey: "nodeState",
      refine: (value): CheckSuccess<ProgramNode> => {
        console.log(value)
        return {
          // @ts-ignore
          value,
          type: "success",
          warnings: [],
        }
      },
      read: ({ read }) => read(nodeId),
    }),
  ],
})

export const nodeState = selectorFamily<ProgramNode, string>({
  key: "selector/node",
  get:
    (id) =>
    ({ get }) =>
      get(_nodeState(id)),
  set:
    (id) =>
    ({ get, set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        const edges = get(edgesByNodeIdState({ nodeId: id }))
        for (const edge of edges) {
          reset(edgeState(edge.id))
        }
        reset(_nodeState(id))
        set(nodeIdsState, (ids) => new Set([...ids].filter((i) => i !== id)))
        return
      }

      set(_nodeState(id), newValue)
      set(nodeIdsState, (ids) => (ids.has(id) ? ids : new Set([...ids, id])))
    },
})

export const nodeIdsState = atom<Set<string>>({
  key: "atom/nodeIds",
  default: new Set(),
  effects: [
    syncEffect({
      storeKey: "nodeIdsState",
      refine: (value): CheckSuccess<Set<string>> => {
        console.log(value)
        return {
          // @ts-ignore
          value,
          type: "success",
          warnings: [],
        }
      },
    }),
  ],
})

export const nodesState = selector<ProgramNode[]>({
  key: "atom/nodes",
  get: ({ get }) => {
    const ids = get(nodeIdsState)
    return [...ids].map((id) => get(nodeState(id)))
  },
})

export const useNodeIds = () => [...useRecoilValue(nodeIdsState)]

export const useNode = (id: string) => useRecoilValue(nodeState(id))

export const useExtraPropsOperation = (nodeId: string, id: string) => {
  const [node, setNode] = useRecoilState(nodeState(nodeId))
  const value = node.extraProps[id]

  const updateExtraProp = useCallback(
    (value: unknown) => {
      setNode((node) => ({
        ...node,
        extraProps: {
          ...node.extraProps,
          [id]: value,
        },
      }))
    },
    [id, setNode],
  )

  return [value, updateExtraProp] as const
}
