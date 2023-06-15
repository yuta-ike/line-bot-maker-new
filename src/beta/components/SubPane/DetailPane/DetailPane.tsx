import React, { useMemo } from "react"
import classNames from "classnames"

import PaneCard from "@/beta/view/component/PaneCard"
import { useIsDragging } from "@/beta/services/move/isDragging"

import { useSelectedElementsState } from "./selectedElements"
import NodeDetailPane from "./NodeDetailPane"
import MultiDetailPane from "./MultiDetailPane"

export type DetailPaneProps = {
  className?: string
}

const DetailPane: React.FC<DetailPaneProps> = ({ className }) => {
  // select
  const selectedElement = useSelectedElementsState()

  // drag
  const isDragging = useIsDragging()

  const content = useMemo(() => {
    if (selectedElement.length === 0) {
      return (
        <div>
          {/* <input
            className="w-full text-lg font-bold border border-transparent rounded focus:border-slate-600/20 focus:outline-none"
            value="天気予報プログラム"
            onChange={() => {}}
          />
          <hr className="my-4 w-[calc(100%+32px)] -translate-x-4" /> */}
        </div>
      )
    }

    const element = selectedElement[0]
    if (selectedElement.length === 1 && element != null) {
      if (element.type === "node") {
        return (
          <NodeDetailPane nodeId={element.node.id} model={element.node.model} />
        )
      } else {
        return <div>Edge</div>
      }
    } else if (1 < selectedElement.length) {
      return <MultiDetailPane selectedCount={selectedElement.length} />
    }

    return null
  }, [selectedElement])

  return (
    <PaneCard
      className={classNames(
        isDragging && "transition hover:opacity-30",
        className,
      )}
    >
      {content}
    </PaneCard>
  )
}

export default DetailPane
