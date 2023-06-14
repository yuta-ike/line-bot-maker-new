import { selectorFamily, useRecoilValue } from "recoil"

import { nodeState } from "@/beta/services/node/node"
import { nodeModelState } from "@/beta/services/nodeModel/nodeModel"

type Param = { nodeId: string; extraPropId: string }

const localMagicVariablesState = selectorFamily({
  key: "selector/localMagicVariables",
  get:
    ({ nodeId, extraPropId }: Param) =>
    ({ get }) => {
      const node = get(nodeState(nodeId))
      const model = get(nodeModelState(node.modelId))
      const extraProp = model.extraProps?.find((i) => i.id === extraPropId)
      return extraProp
    },
})

export const useLocalMagicVariable = (param: Param) =>
  useRecoilValue(localMagicVariablesState(param))
