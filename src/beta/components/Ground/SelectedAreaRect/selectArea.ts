import { useCallback, useState } from "react"
import {
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import {
  isTemporallySelectedState,
  selectAreaState,
} from "@/beta/services/select/selectArea"
import {
  isElementSelectedState,
  selectedNodesState,
} from "@/beta/services/select/selectedElement"
import { blockNodesState } from "@/beta/services/selector/blockNode"

export const selectAreaRectState = selector({
  key: "selector/selectAreaRectState",
  get: ({ get }) => {
    const selectedNodes = get(selectedNodesState)
    if (selectedNodes.length === 0) {
      return null
    }

    const boudingRect = {
      upperLeft: {
        x: Infinity,
        y: Infinity,
      },
      lowerRight: {
        x: -Infinity,
        y: -Infinity,
      },
    }

    for (const node of selectedNodes) {
      const { x, y, width } = node.rect
      boudingRect.upperLeft.x = Math.min(boudingRect.upperLeft.x, x)
      boudingRect.upperLeft.y = Math.min(boudingRect.upperLeft.y, y)
      boudingRect.lowerRight.x = Math.max(boudingRect.lowerRight.x, x + width)
      boudingRect.lowerRight.y = Math.max(boudingRect.lowerRight.y, y + 100)
    }

    return boudingRect
  },
})

export const useSelectArea = () => {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
  const [selectArea, setSelectArea] = useRecoilState(selectAreaState)

  const setPos = useCallback(
    (type: "start" | "end", x: number, y: number) => {
      if (type === "start") {
        setOrigin({
          x,
          y,
        })
      } else if (type === "end") {
        if (origin == null) {
          return
        }
        setSelectArea({
          start: {
            x: Math.min(x, origin.x),
            y: Math.min(y, origin.y),
          },
          end: {
            x: Math.max(x, origin.x),
            y: Math.max(y, origin.y),
          },
        })
      }
    },
    [origin, setSelectArea],
  )

  const confirmSelect = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const blockNodes = snapshot.getLoadable(blockNodesState).getValue()
        for (const { node } of blockNodes) {
          const isTemporallySelected = snapshot
            .getLoadable(isTemporallySelectedState(node.id))
            .getValue()
          if (isTemporallySelected) {
            set(isElementSelectedState({ type: "node", id: node.id }), true)
          }
        }
      },
    [],
  )

  const resetPos = useCallback(() => {
    confirmSelect()
    setOrigin(null)
    setSelectArea(null)
  }, [confirmSelect, setSelectArea])

  return [origin, selectArea, setPos, resetPos] as const
}

export const useIsAreaSelected = () => useRecoilValue(selectAreaState) != null

export const useSelectedArea = () => {
  const rect = useRecoilValue(selectAreaRectState)
  const selectedNodes = useRecoilValue(selectedNodesState)

  const inputNodeId =
    selectedNodes?.[0]?.node.modelId === "standard-input"
      ? selectedNodes[0].node.id
      : null

  return { rect, count: selectedNodes.length, inputNodeId }
}
