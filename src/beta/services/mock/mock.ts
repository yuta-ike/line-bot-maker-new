import {
  DefaultValue,
  atomFamily,
  selectorFamily,
  useRecoilState,
  atom,
  selector,
  useRecoilValue,
} from "recoil"

export type Mock = {
  socketId: string
  value: string
}

export const _mockState = atomFamily<Mock, string>({
  key: "atom/mock",
  default: undefined,
})

export const mockIdsState = atom<string[]>({
  key: "atom/mockIds",
  default: [],
})

export const mockState = selectorFamily<Mock, string>({
  key: "selector/mock",
  get:
    (nodeId) =>
    ({ get }) => {
      return get(_mockState(nodeId))
    },
  set:
    (nodeId) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(_mockState(nodeId))
        set(mockIdsState, (ids) => ids.filter((id) => id !== nodeId))
        return
      }

      set(_mockState(nodeId), newValue)
      set(mockIdsState, (ids) =>
        ids.includes(nodeId) ? ids : [...ids, nodeId],
      )
    },
})

export const useMockValue = (nodeId: string) =>
  useRecoilState(mockState(nodeId))

export const mocksState = selector<(Mock & { nodeId: string })[]>({
  key: "selector/mocks",
  get: ({ get }) => {
    const nodeIds = get(mockIdsState)
    return nodeIds.map((id) => ({ nodeId: id, ...get(mockState(id)) }))
  },
})

export const useMocks = () => useRecoilValue(mocksState)
