import {
  DefaultValue,
  atom,
  atomFamily,
  selector,
  selectorFamily,
} from "recoil"

import { BlockNode, blockNodeState } from "../selector/blockNode"

export type SelectedNode = {
  type: "node"
  id: string
}
export type SelectedEdge = {
  type: "edge"
  id: string
}
export type SelectedSocket = {
  type: "socket"
  nodeId: string
  socketId: string
}

export type SelectedElement = SelectedNode | SelectedEdge | SelectedSocket

export const isEqualElement = (a: SelectedElement, b: SelectedElement) => {
  if (a.type !== b.type) {
    return false
  }
  if (a.type === "node" && b.type === "node") {
    return a.id === b.id
  }
  if (a.type === "edge" && b.type === "edge") {
    return a.id === b.id
  }
  if (a.type === "socket" && b.type === "socket") {
    return a.nodeId === b.nodeId && a.socketId === b.socketId
  }
  return false
}

export const isSelectedState = atomFamily<boolean, SelectedElement>({
  key: "atom/_isSelected",
  default: false,
})

export const selectedElementIdsState = atom<Set<SelectedElement>>({
  key: "atom/selectedElementIds",
  default: new Set(),
})

export const selectedElementState = selectorFamily<boolean, SelectedElement>({
  key: "selector/selectedElement",
  get:
    (id) =>
    ({ get }) => {
      return get(isSelectedState(id))
    },
  set:
    (id) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(isSelectedState(id))
        set(selectedElementIdsState, (ids) => {
          return new Set([...ids].filter((_id) => !isEqualElement(id, _id)))
        })
        return
      }

      set(isSelectedState(id), newValue)
      set(
        selectedElementIdsState,
        (ids) =>
          new Set(
            newValue
              ? [...ids, id]
              : [...ids].filter((_id) => !isEqualElement(id, _id)),
          ),
      )
    },
})

export const isElementSelectedState = selectorFamily<boolean, SelectedElement>({
  key: "selector/isElementSelected",
  get:
    (elm) =>
    ({ get }) =>
      get(isSelectedState(elm)),
  set:
    (elm) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(isSelectedState(elm))
        set(
          selectedElementIdsState,
          (ids) =>
            new Set([...ids].filter((_elm) => !isEqualElement(elm, _elm))),
        )
        return
      }

      set(isSelectedState(elm), newValue)
      set(
        selectedElementIdsState,
        (ids) =>
          new Set(
            newValue
              ? [...ids, elm]
              : [...ids].filter((_elm) => !isEqualElement(elm, _elm)),
          ),
      )
    },
})

export const selectedElementsState = selector<SelectedElement[]>({
  key: "selector/selectedElements",
  get: ({ get }) => {
    const selectedElementIds = get(selectedElementIdsState)
    return [...selectedElementIds]
  },
})

export const selectedNodeIdsState = selector<string[]>({
  key: "selector/selectedNodeIds",
  get: ({ get }) => {
    const selectedElementIds = get(selectedElementIdsState)
    return [...selectedElementIds]
      .filter((elm): elm is SelectedNode => elm.type === "node")
      .map((elm) => elm.id)
  },
})

export const selectedNodesState = selector<BlockNode[]>({
  key: "selector/selectedNode",
  get: ({ get }) => {
    const selectedElementIds = get(selectedNodeIdsState)
    const res = selectedElementIds.map((id) => get(blockNodeState(id)))
    return res
  },
})

export const selectedSocketState = selector<SelectedSocket | null>({
  key: "selector/selectedSocket",
  get: ({ get }) => {
    const selectedNodeIds = get(selectedElementIdsState)
    const selectedEdge = [...selectedNodeIds].find(
      (elm): elm is SelectedSocket => elm.type === "socket",
    )
    return selectedEdge ?? null
  },
})

export const selectedElementsCountState = selector({
  key: "selector/selectedElementsCount",
  get: ({ get }) => {
    const selectedElementIds = get(selectedElementIdsState)
    return selectedElementIds.size
  },
})
