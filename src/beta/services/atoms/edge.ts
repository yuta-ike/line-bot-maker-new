import {
  DefaultValue,
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil"
import { syncEffect } from "recoil-sync"
import { CheckSuccess } from "@recoiljs/refine"

import { DataType } from "@/beta/models/NodeModel"
import { genId } from "@/utils/genId"

import {
  isElementSelectedState,
  selectedSocketState,
} from "../select/selectedElement"

export type ProgramEdge = {
  id: string
  from: {
    id: string
    socketId: string
  }
  to: {
    id: string
    socketId: string
  }
  type: DataType
}

const _edgeState = atomFamily<ProgramEdge, string>({
  key: "atom/edge",
  default: undefined,
  effects: (nodeId) => [
    syncEffect({
      storeKey: "edgeState",
      refine: (value): CheckSuccess<ProgramEdge> => {
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

export const edgeIdsState = atom<Set<string>>({
  key: "atom/edgeIds",
  default: new Set(),
  effects: [
    syncEffect({
      storeKey: "edgeIdsState",
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

export const edgeState = selectorFamily<ProgramEdge, string>({
  key: "selector/edge",
  get:
    (id) =>
    ({ get }) =>
      get(_edgeState(id)),
  set:
    (id) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(_edgeState(id))
        set(edgeIdsState, (ids) => new Set([...ids].filter((i) => i !== id)))
        return
      }

      set(_edgeState(id), newValue)
      set(edgeIdsState, (ids) => (ids.has(id) ? ids : new Set([...ids, id])))
    },
})

export const edgesState = selector<ProgramEdge[]>({
  key: "selector/edges",
  get: ({ get }) => {
    const ids = get(edgeIdsState)
    return [...ids].map((id) => get(_edgeState(id)))
  },
})

export const useEdgeIds = () => [...useRecoilValue(edgeIdsState)]
export const useEdges = () => useRecoilValue(edgesState)
export const useEdge = (id: string) => useRecoilValue(edgeState(id))

type AddEdgeArgs = {
  nodeId: string
  socketId: string
  type: DataType
}

export const useEdgeOperations = () => {
  const addEdge = useRecoilCallback(
    ({ set, snapshot }) =>
      (args: AddEdgeArgs) => {
        const socket = snapshot.getLoadable(selectedSocketState).getValue()

        if (socket == null) {
          return
        }

        const id = genId()
        set(edgeState(id), {
          id,
          type: args.type,
          from: {
            id: socket.nodeId,
            socketId: socket.socketId,
          },
          to: {
            id: args.nodeId,
            socketId: args.socketId,
          },
        })

        set(isElementSelectedState(socket), false)
      },
  )

  return { addEdge }
}
