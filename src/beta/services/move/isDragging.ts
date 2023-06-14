import { useRecoilValue } from "recoil"

import { useSomeNodeMoving } from "@/beta/components/NodeBlock/isMovingState"

import { selectedElementIdsState } from "../select/selectedElement"

export const useIsDragging = () => {
  const ids = useRecoilValue(selectedElementIdsState)
  const isMoving = useSomeNodeMoving()
  const isElementExceptNodeSelected = [...ids].find((id) => id.type !== "node")
  const isNodeDragging = 0 < ids.size && isMoving
  return isElementExceptNodeSelected || isNodeDragging
}

export const useSelectedElements = () => useRecoilValue(selectedElementIdsState)
