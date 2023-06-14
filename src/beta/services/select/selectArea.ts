import { atom, selectorFamily } from "recoil"

import { blockNodeState } from "@/beta/services/selector/blockNode"

export type SelectArea = {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
}

export const selectAreaState = atom<SelectArea | null>({
  key: "atom/selectArea",
  default: null,
})

export const isTemporallySelectedState = selectorFamily<boolean, string>({
  key: "selector/isTemporallySelectedState",
  get:
    (id: string) =>
    ({ get }) => {
      const selectArea = get(selectAreaState)
      if (selectArea == null) {
        return false
      }
      const node = get(blockNodeState(id))
      if (node == null) {
        return false
      }
      const { x, y } = node.rect
      return (
        selectArea.start.x <= x &&
        x <= selectArea.end.x &&
        selectArea.start.y <= y &&
        y <= selectArea.end.y
      )
    },
})
