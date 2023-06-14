import React from "react"

import { useSelectedNodes } from "./hook"

const SelectElementPanel: React.FC = () => {
  const selectedNodes = useSelectedNodes()

  if (selectedNodes.length === 1) {
    const node = selectedNodes[0]!
    return (
      <div className="fixed inset-y-4 left-4 w-[260px] space-y-4 rounded-xl bg-white/90 p-6 shadow-popper">
        <h2 className="flex items-center space-x-2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-blue-400" />
          <span className="block">{node.model.meta.name}</span>
        </h2>
      </div>
    )
  } else {
    return (
      <div className="fixed inset-y-4 left-4 w-[260px] space-y-4 rounded-xl bg-white/90 p-6 shadow-popper">
        <h2>グループ ({selectedNodes.length})</h2>
      </div>
    )
  }
}

export default SelectElementPanel
