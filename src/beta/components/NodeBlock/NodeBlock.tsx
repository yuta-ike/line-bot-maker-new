import React, { useRef } from "react"
import Draggable, { DraggableData, DraggableEvent } from "react-draggable"
import { useRecoilValue } from "recoil"
import { throttle } from "throttle-debounce"
import classNames from "classnames"
import { FiCheck, FiXCircle } from "react-icons/fi"

import { isElementSelectedState } from "@/beta/services/select/selectedElement"

import { blockNodeState } from "../../services/selector/blockNode"
import { useIsSelectedOperation } from "../../services/select/select"
import UiModel from "../UiModel/UiModel"
import { useMove } from "../../services/move/groupMove"

import { useIsNodeMoving } from "./isMovingState"
import OutputSocket from "./OutputSocket"
import InputSocket from "./InputSocket"
import { useNodeStacktrace } from "./nodeStacktrace"

export type NodeBlockProps = {
  id: string
}

const NodeBlock: React.FC<NodeBlockProps> = ({ id }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null)

  // Node
  const node = useRecoilValue(blockNodeState(id))

  // Select
  const isSelected = useRecoilValue(
    isElementSelectedState({ type: "node", id }),
  )
  const { switchSelect, toggleSelect, addSelect, putSelect, removeSelect } =
    useIsSelectedOperation()

  // Move
  const move = useMove()
  const [isMoving, setIsMoving] = useIsNodeMoving(id)

  // stacktrace
  const stacktrace = useNodeStacktrace(id)

  if (node == null) {
    return null
  }

  return (
    <Draggable
      position={{
        x: node.rect.x,
        y: node.rect.y,
      }}
      bounds="parent"
      cancel=".undraggable"
      onDrag={throttle(50, (_: DraggableEvent, data: DraggableData) =>
        move(data),
      )}
      onStart={(e) => {
        setIsMoving(true)
        if (e.shiftKey) {
          if (isSelected) {
            removeSelect({ type: "node", id })
          } else {
            addSelect({ type: "node", id })
          }
        } else {
          if (!isSelected) {
            putSelect({ type: "node", id })
          }
        }
      }}
      onStop={() => setIsMoving(false)}
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="absolute"
        onClick={(e) => {
          e.stopPropagation()
          if (e.shiftKey) {
            toggleSelect({ type: "node", id })
          } else {
            switchSelect({ type: "node", id })
          }
        }}
        style={{
          "--block-color": node.model.body.color,
        }}
      >
        {stacktrace != null && (
          <button
            className={classNames(
              "absolute left-0 top-3 -z-10 flex items-center rounded-l-full px-1 py-0.5 text-white shadow-xl transition",
              stacktrace.status === "success" ? "bg-emerald-500" : "bg-red-500",
              isSelected
                ? "-translate-x-[calc(100%+9px)]"
                : "-translate-x-[calc(100%)]",
            )}
          >
            {stacktrace.status === "success" ? (
              <FiCheck strokeWidth={3} size={14} />
            ) : (
              <FiXCircle strokeWidth={3} size={14} />
            )}
            <span className="ml-0.5">{stacktrace.order + 1}</span>
          </button>
        )}

        <div
          className={classNames(
            "line-2 flex h-[100px] w-[160px] cursor-pointer flex-col rounded-lg bg-block p-2 text-white outline-4",
            isMoving ? "shadow-card-drag delay-100" : "shadow-card",
          )}
        >
          {node.model.sockets.input.map((socket) => (
            <InputSocket
              key={socket.id}
              nodeId={node.node.id}
              socketId={socket.id}
            />
          ))}
          <UiModel nodeId={node.node.id} uiModel={node.model.body} />
          <div className="mt-auto flex justify-evenly">
            {node.model.sockets.output.map((socket) => (
              <OutputSocket
                key={socket.id}
                nodeId={node.node.id}
                socketId={socket.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default NodeBlock
