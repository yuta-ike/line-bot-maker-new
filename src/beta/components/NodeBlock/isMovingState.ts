import { atom, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil"

import { isElementSelectedState } from "@/beta/services/select/selectedElement"

const _isMovingState = atom({ key: "atom/_isMoving", default: false })

const movingNodeIds = atom<string[]>({
  key: "atom/movingNodeIds",
  default: [],
})

export const isMovingState = selectorFamily<boolean, string>({
  key: "selector/isMoving",
  get:
    (id: string) =>
    ({ get }) => {
      const isNodeSelected = get(isElementSelectedState({ type: "node", id }))
      const isMoving = get(_isMovingState)
      return isNodeSelected && isMoving
    },
  set:
    (id: string) =>
    ({ set }, newValue) => {
      set(_isMovingState, newValue)
      set(isElementSelectedState({ type: "node", id }), newValue)
      set(movingNodeIds, (prev) => {
        if (newValue) {
          return [...prev, id]
        }
        return prev.filter((i) => i !== id)
      })
    },
})

export const useSomeNodeMoving = () => 0 < useRecoilValue(movingNodeIds).length

export const useIsNodeMoving = (id: string) => {
  const isMoving = useRecoilValue(isMovingState(id))
  const setIsMoving = useRecoilCallback(({ set }) => (value: boolean) => {
    set(isMovingState(id), value)
  })
  return [isMoving, setIsMoving] as const
}
