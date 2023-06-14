import React from "react"

import { UiModel as UiModelType } from "@/beta/models/UiModel"

import UiStruct from "./UiStruct"

export type UiModelProps = {
  nodeId: string
  uiModel: UiModelType
}

const UiModel: React.FC<UiModelProps> = ({ nodeId, uiModel }) => {
  return (
    <div>
      <UiStruct nodeId={nodeId} struct={uiModel.struct} />
    </div>
  )
}

export default UiModel
