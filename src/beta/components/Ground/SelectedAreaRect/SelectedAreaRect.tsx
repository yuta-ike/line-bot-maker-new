import React from "react"
import { FiTrash2, FiCopy, FiAlignLeft, FiPlay } from "react-icons/fi"

import Tooltip from "@/beta/view/atoms/Tooltop"
import AlignPopover from "@/beta/view/atoms/AlignPopover"
import { useSelectedNodeOperation } from "@/beta/services/select/selectNodeOperation"
import { useRunInterpreter } from "@/beta/interpreter/hook"

import { useSomeNodeMoving } from "../../NodeBlock/isMovingState"

import { useSelectedArea } from "./selectArea"

export type SelectedAreaRectProps = {}

const SelectedAreaRect: React.FC = () => {
  const { rect, count, inputNodeId } = useSelectedArea()
  const { duplicateNodes, removeNodes, alignNodes } = useSelectedNodeOperation()
  const isSomeNodeMoving = useSomeNodeMoving()
  const { runInterpreter } = useRunInterpreter()

  if (rect == null) {
    return null
  }

  if (count === 1 && isSomeNodeMoving) {
    return null
  }

  return (
    <div
      className="pointer-events-none absolute rounded-xl border-2 border-[#BBB4A8]"
      style={{
        top: rect.upperLeft.y - 6,
        left: rect.upperLeft.x - 6,
        width: rect.lowerRight.x - rect.upperLeft.x + 12,
        height: rect.lowerRight.y - rect.upperLeft.y + 12,
      }}
    >
      <div className="pointer-events-auto absolute left-[calc(100%+8px)] top-0 flex w-max flex-col items-start space-y-2">
        {2 <= count && (
          <div className="ml-1 rounded-full bg-gray-400 px-2 py-0.5 text-xs text-white">
            {count}件
          </div>
        )}
        {inputNodeId != null && (
          <Tooltip label="実行" side="right">
            <button
              className="relative rounded p-1.5 transition hover:bg-gray-400/20"
              aria-label="実行"
              onClick={() => runInterpreter("debugger", inputNodeId)}
            >
              <FiPlay />
            </button>
          </Tooltip>
        )}
        <Tooltip label="削除" side="right">
          <button
            className="relative rounded p-1.5 transition hover:bg-gray-400/20"
            aria-label="削除"
            onClick={removeNodes}
          >
            <FiTrash2 />
          </button>
        </Tooltip>
        <Tooltip label="複製" side="right">
          <button
            className="relative rounded p-1.5 transition hover:bg-gray-400/20"
            aria-label="複製"
            onClick={duplicateNodes}
          >
            <FiCopy />
          </button>
        </Tooltip>
        {2 <= count && (
          <AlignPopover onAlign={alignNodes}>
            {/* <Tooltip label="整列" side="right"> */}
            <button
              className="relative rounded p-1.5 transition hover:bg-gray-400/20"
              aria-label="整列"
              onClick={() => {}}
            >
              <FiAlignLeft />
            </button>
            {/* </Tooltip> */}
          </AlignPopover>
        )}
      </div>
    </div>
  )
}

export default SelectedAreaRect
