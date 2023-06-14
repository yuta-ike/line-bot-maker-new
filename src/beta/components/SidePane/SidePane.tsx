import React from "react"

import SpawnPane from "./SpawnPane/SpawnPane"
import ExecPane from "./ExecPane/ExecPane"

export type SidePaneProps = {}

const SidePane: React.FC<SidePaneProps> = () => {
  return (
    <div className="absolute bottom-4 left-4 top-[80px] w-[260px] space-y-4">
      <ExecPane />
      <SpawnPane />
    </div>
  )
}

export default SidePane
