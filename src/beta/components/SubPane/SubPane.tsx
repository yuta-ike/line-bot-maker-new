import React from "react"

import DetailPane from "./DetailPane/DetailPane"
import SidePanelButton from "./SidePanelButton/SidePanelButton"

const SubPane = () => {
  return (
    <div className="absolute right-4 top-[80px] flex flex-col items-end space-y-4">
      <SidePanelButton />
      <DetailPane />
    </div>
  )
}

export default SubPane
