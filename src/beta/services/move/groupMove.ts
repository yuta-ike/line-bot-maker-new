import { useRecoilCallback } from "recoil"

import {
  SelectedNode,
  selectedElementIdsState,
} from "@/beta/services/select/selectedElement"
import { zoomState } from "@/beta/services/atoms/control"

import { blockNodeState } from "../selector/blockNode"

export const useMove = () => {
  const move = useRecoilCallback(
    ({ snapshot, set }) =>
      ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
        const selected = snapshot
          .getLoadable(selectedElementIdsState)
          .getValue()
        const zoom = snapshot.getLoadable(zoomState).getValue()
        ;[...selected]
          .filter((elm): elm is SelectedNode => elm.type === "node")
          .forEach((elm) => {
            set(blockNodeState(elm.id), (node) => ({
              ...node,
              rect: {
                ...node.rect,
                x: node.rect.x + deltaX / zoom,
                y: node.rect.y + deltaY / zoom,
              },
            }))
          })
      },
    [],
  )

  return move
}
