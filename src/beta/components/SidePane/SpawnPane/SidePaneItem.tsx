import React, { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import { MdDragIndicator } from "react-icons/md"
import { useRecoilCallback } from "recoil"
import classNames from "classnames"

import { useBlockNodeOperation } from "@/beta/services/selector/blockNode"
import { usePointerPos } from "@/utils/pointerPos"
import { NodeModel } from "@/beta/models/NodeModel"
import { useIsSelectedOperation } from "@/beta/services/select/select"
import { Rect } from "@/utils/rect"

import { useMove } from "../../../services/move/groupMove"
import { isMovingState } from "../../NodeBlock/isMovingState"

import { useIsButtonDragging } from "./isDragging"

export type SidePaneItemProps = {
  nodeModel: NodeModel
  paneRect: Rect | null
  disabledOverflowHidden?: boolean
}

const SidePaneItem: React.FC<SidePaneItemProps> = ({ nodeModel, paneRect }) => {
  const move = useMove()
  const { addNode } = useBlockNodeOperation()
  const { putSelect, clearSelect } = useIsSelectedOperation()

  const draggableRef = useRef<HTMLDivElement | null>(null)
  const addedNodeIdRef = useRef<string | null>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [isDragging, setIsDragging] = useIsButtonDragging(nodeModel.id)

  const pointerPos = usePointerPos()

  const setMovingState = useRecoilCallback(
    ({ set }) =>
      (id: string, isMoving: boolean) => {
        set(isMovingState(id), isMoving)
      },
  )

  const isDraggingOutsidePane = (() => {
    if (!isDragging) {
      return false
    }
    if (paneRect == null) {
      return false
    }
    return (
      paneRect.x + paneRect.width <= pointerPos.x ||
      paneRect.y + paneRect.height <= pointerPos.y ||
      pointerPos.x < paneRect.x ||
      pointerPos.y < paneRect.y
    )
  })()

  useEffect(() => {
    if (isDraggingOutsidePane && addedNodeIdRef.current == null) {
      const id = addNode(
        { modelId: nodeModel.id },
        { x: pointerPos.x - 10, y: pointerPos.y - 10 },
      )
      setMovingState(id, true)
      putSelect({ type: "node", id })
      addedNodeIdRef.current = id
    }
  }, [
    addNode,
    isDraggingOutsidePane,
    nodeModel.id,
    pointerPos,
    putSelect,
    setMovingState,
  ])

  return (
    <div className="relative cursor-pointer hover:shadow">
      <div
        className="absolute flex w-full items-center justify-between rounded border border-gray-100 bg-white px-3 py-2 text-sm"
        aria-hidden
      >
        <span>{nodeModel.meta.name}</span>
        <MdDragIndicator />
      </div>
      <Draggable
        position={position}
        onStart={() => {
          setIsDragging(true)
          clearSelect()
        }}
        onStop={() => {
          setIsDragging(false)
          if (addedNodeIdRef.current != null) {
            setMovingState(addedNodeIdRef.current, false)
          }
          setPosition({ x: 0, y: 0 })
          addedNodeIdRef.current = null
        }}
        onDrag={(_, data) => {
          move(data)
          setPosition(data)
        }}
        nodeRef={draggableRef}
      >
        <div ref={draggableRef} className="w-full ">
          <div
            className={classNames(
              "flex w-full items-center justify-between rounded border border-gray-100 bg-white px-3 py-2 text-sm",
              // isDraggingOutsidePane && "scale-0 opacity-0 transition",
            )}
          >
            <span>{nodeModel.meta.name}</span>
            <MdDragIndicator />
          </div>
        </div>
      </Draggable>
    </div>
  )
}

export default SidePaneItem
