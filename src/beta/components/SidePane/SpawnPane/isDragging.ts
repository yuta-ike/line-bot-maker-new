import {
  DefaultValue,
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil"

const _isButtonDraggingState = atomFamily<boolean, string>({
  key: "atoms/isButtonDragging",
  default: false,
})

export const isButtonDraggingState = selectorFamily<boolean, string>({
  key: "selectors/isButtonDragging",
  get:
    (nodeModelId) =>
    ({ get }) =>
      get(_isButtonDraggingState(nodeModelId)),
  set:
    (nodeModelId) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(_isButtonDraggingState(nodeModelId))
        set(
          draggingNodeModelIds,
          (prev) => new Set([...prev].filter((id) => id != nodeModelId)),
        )
        return
      }

      set(_isButtonDraggingState(nodeModelId), newValue)
      set(
        draggingNodeModelIds,
        (prev) =>
          new Set(
            newValue
              ? [...prev, nodeModelId]
              : [...prev].filter((id) => id != nodeModelId),
          ),
      )
    },
})

export const draggingNodeModelIds = atom<Set<string>>({
  key: "atoms/draggingNodeModelIds",
  default: new Set(),
})

export const useIsButtonDragging = (nodeModelId: string) =>
  useRecoilState(isButtonDraggingState(nodeModelId))

export const useIsSomeButtonDragging = () =>
  0 < useRecoilValue(draggingNodeModelIds).size
