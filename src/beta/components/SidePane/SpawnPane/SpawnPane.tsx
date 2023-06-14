import React from "react"
import classNames from "classnames"

import { useRect } from "@/utils/rect"
import { NODE_MODELS } from "@/beta/services/nodeModel/nodeModel"
import FoldablePaneCard from "@/beta/view/component/FoldablePaneCard"

import SidePaneItem from "./SidePaneItem"
import { useIsSomeButtonDragging } from "./isDragging"

export type SpawnPaneProps = {
  className?: string
}

const SpawnPane: React.FC<SpawnPaneProps> = ({ className }) => {
  const [paneRef, paneRect] = useRect()
  const isDragging = useIsSomeButtonDragging()

  return (
    <FoldablePaneCard
      title="ブロック"
      className={classNames("", className)}
      ref={paneRef}
      // NOTE: ドラッグ中はoverflow:hiddenを解除する
      disabledOverflowHidden={isDragging}
    >
      <ul className="flex flex-col w-full space-y-2">
        {NODE_MODELS.map((nodeModel) => (
          <li key={nodeModel.id} className="w-full">
            <SidePaneItem nodeModel={nodeModel} paneRect={paneRect} />
          </li>
        ))}
      </ul>
    </FoldablePaneCard>
  )
}

export default SpawnPane
