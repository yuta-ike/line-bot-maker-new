import { useRecoilCallback, useRecoilValue } from "recoil"

import { nodeIdsState } from "../node/node"

import {
  SelectedElement,
  isElementSelectedState,
  isEqualElement,
  selectedElementIdsState,
  selectedNodeIdsState,
} from "./selectedElement"

export const useSelectedNodeIds = () => useRecoilValue(selectedNodeIdsState)

export const useIsSelectedOperation = () => {
  const addSelect = useRecoilCallback(
    ({ set }) =>
      (elm: SelectedElement) =>
        set(isElementSelectedState(elm), true),
  )

  const addSelectAll = useRecoilCallback(({ snapshot, set }) => () => {
    const ids = snapshot.getLoadable(nodeIdsState).getValue()
    for (const id of ids) {
      set(isElementSelectedState({ type: "node", id }), true)
    }
  })

  const putSelect = useRecoilCallback(
    ({ set, snapshot }) =>
      (elm: SelectedElement) => {
        const selectedElementIds = snapshot
          .getLoadable(selectedElementIdsState)
          .getValue()
        for (const _elm of selectedElementIds) {
          set(isElementSelectedState(_elm), false)
        }
        set(isElementSelectedState(elm), true)
      },
    [],
  )

  const removeSelect = useRecoilCallback(
    ({ set }) =>
      (elm: SelectedElement) => {
        set(isElementSelectedState(elm), false)
      },
    [],
  )

  const clearSelect = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const selectedElementIds = snapshot
          .getLoadable(selectedElementIdsState)
          .getValue()
        for (const elm of selectedElementIds) {
          set(isElementSelectedState(elm), false)
        }
      },
    [],
  )

  const switchSelect = useRecoilCallback(
    ({ snapshot }) =>
      (elm: SelectedElement) => {
        const selectedElementIds = snapshot
          .getLoadable(selectedElementIdsState)
          .getValue()

        const isSelected = [...selectedElementIds].find((_elm) =>
          isEqualElement(elm, _elm),
        )
        if (isSelected) {
          clearSelect()
        } else {
          putSelect(elm)
        }
      },
    [clearSelect, putSelect],
  )

  const toggleSelect = useRecoilCallback(
    ({ snapshot }) =>
      (elm: SelectedElement) => {
        const selectedElementIds = snapshot
          .getLoadable(selectedElementIdsState)
          .getValue()
        const isSelected = [...selectedElementIds].find((_elm) =>
          isEqualElement(elm, _elm),
        )
        if (isSelected) {
          removeSelect(elm)
        } else {
          addSelect(elm)
        }
      },
    [addSelect, removeSelect],
  )

  return {
    switchSelect,
    toggleSelect,
    addSelect,
    addSelectAll,
    putSelect,
    removeSelect,
    clearSelect,
  }
}
