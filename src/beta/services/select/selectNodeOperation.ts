import { useRecoilCallback } from "recoil"

import { selectedNodesState } from "@/beta/services/select/selectedElement"
import { selectAreaRectState } from "@/beta/components/Ground/SelectedAreaRect/selectArea"

import { useBlockNodeOperation } from "../selector/blockNode"

import { useIsSelectedOperation } from "./select"

export const useSelectedNodeOperation = () => {
  const { addNode, updateNodePosition, removeNode } = useBlockNodeOperation()
  const { putSelect, addSelect } = useIsSelectedOperation()

  const removeNodes = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const selectedNodes = snapshot
          .getLoadable(selectedNodesState)
          .getValue()
        selectedNodes.forEach(({ node }) => removeNode(node.id))
      },
    [removeNode],
  )

  const duplicateNodes = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const selectedNodes = snapshot
          .getLoadable(selectedNodesState)
          .getValue()

        // 本当はノードの大きさから計算したい
        const selectAreaRect = snapshot
          .getLoadable(selectAreaRectState)
          .getValue()!

        selectedNodes.forEach((node, i) => {
          const addedNode = addNode(
            {
              modelId: node.node.modelId,
            },
            {
              x:
                node.rect.x +
                (selectAreaRect.lowerRight.x - selectAreaRect.upperLeft.x) +
                50,
              y: node.rect.y + 50,
            },
          )

          if (i === 0) {
            putSelect({ type: "node", id: addedNode })
          } else {
            addSelect({ type: "node", id: addedNode })
          }
        })
      },
    [addNode, addSelect, putSelect],
  )

  const alignNodes = useRecoilCallback(
    ({ snapshot }) =>
      (type: "top" | "bottom" | "left" | "right" | "v-center" | "h-center") => {
        const selectedNodes = snapshot
          .getLoadable(selectedNodesState)
          .getValue()

        const selectAreaRect = snapshot
          .getLoadable(selectAreaRectState)
          .getValue()!

        selectedNodes.forEach(({ node, rect }) => {
          switch (type) {
            case "top":
              updateNodePosition(node.id, {
                y: selectAreaRect.upperLeft.y,
              })
              break
            case "bottom":
              updateNodePosition(node.id, {
                y: selectAreaRect.lowerRight.y - 100,
              })
              break
            case "left":
              updateNodePosition(node.id, {
                x: selectAreaRect.upperLeft.x,
              })
              break
            case "right":
              updateNodePosition(node.id, {
                x: selectAreaRect.lowerRight.x - rect.width,
              })
              break
            case "v-center":
              updateNodePosition(node.id, {
                y:
                  selectAreaRect.upperLeft.y +
                  (selectAreaRect.lowerRight.y - selectAreaRect.upperLeft.y) /
                    2 -
                  50,
              })
              break
            case "h-center":
              updateNodePosition(node.id, {
                x:
                  selectAreaRect.upperLeft.x +
                  (selectAreaRect.lowerRight.x - selectAreaRect.upperLeft.x) /
                    2 -
                  rect.width / 2,
              })
              break
          }
        })
      },
    [updateNodePosition],
  )

  return {
    removeNodes,
    duplicateNodes,
    alignNodes,
  }
}
