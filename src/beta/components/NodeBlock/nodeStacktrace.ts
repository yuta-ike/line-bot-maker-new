import { selectorFamily, useRecoilValue } from "recoil"

import {
  automaticRunInterpreter,
  simulateResultState,
} from "@/beta/interpreter/hook"
import { runModeState } from "@/beta/interpreter/runMode"

const nodeStacktraceState = selectorFamily({
  key: "selector/nodeStacktrace",
  get:
    (nodeId: string) =>
    ({ get }) => {
      const runMode = get(runModeState)
      const simulateResult = get(
        runMode === "realtime" ? automaticRunInterpreter : simulateResultState,
      )

      const index =
        simulateResult?.stacktrace.findIndex(
          (step) => step.nodeId === nodeId,
        ) ?? -1

      const stacktraceItem = simulateResult?.stacktrace[index]

      if (stacktraceItem == null) {
        return null
      }

      return {
        status: stacktraceItem.type === "failure" ? "failure" : "success",
        order: index,
      }
    },
})

export const useNodeStacktrace = (nodeId: string) =>
  useRecoilValue(nodeStacktraceState(nodeId))
