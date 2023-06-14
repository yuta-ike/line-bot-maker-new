import { DefaultValue, atom, atomFamily, selectorFamily } from "recoil"

import {
  NodeModel,
  StandardInputNodeModel,
  StringEqualNodeModel,
  StringIncludesNodeModel,
  RandomNodeModel,
  AskTextNodeModel,
  TextOutputNodeModel,
} from "../../models/NodeModel"

export const NODE_MODELS = [
  StandardInputNodeModel,
  StringEqualNodeModel,
  StringIncludesNodeModel,
  RandomNodeModel,
  AskTextNodeModel,
  TextOutputNodeModel,
]

const _nodeModelState = atomFamily<NodeModel, string>({
  key: "atom/_node-model",
  default: (modelId) => {
    const res = NODE_MODELS.find((model) => model.id === modelId)
    if (res == null) {
      throw new Error()
    }
    return res
  },
})

export const nodeModelState = selectorFamily<NodeModel, string>({
  key: "selector/node-model",
  get:
    (modelId) =>
    ({ get }) => {
      return get(_nodeModelState(modelId))
    },
  set:
    (id) =>
    ({ set, reset }, newValue) => {
      if (newValue instanceof DefaultValue) {
        reset(_nodeModelState(id))
        return
      }

      set(_nodeModelState(id), newValue)
      set(nodeModelIdsState, (ids) =>
        ids.has(id) ? ids : new Set([...ids, id]),
      )
    },
})

const nodeModelIdsState = atom<Set<string>>({
  key: "atom/node-model-ids",
  default: new Set(NODE_MODELS.map((model) => model.id)),
})
