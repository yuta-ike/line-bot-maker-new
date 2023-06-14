import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import { useMemo } from "react"

import {
  Environment,
  InterpreterOutput,
  Stacktrace,
  runInterpreter,
} from "@/beta/interpreter"
import { programState } from "@/beta/services/selector/program"

import { nodeState } from "../services/node/node"
import { nodeModelState } from "../services/nodeModel/nodeModel"
import { mocksState } from "../services/mock/mock"

import { runModeState } from "./runMode"
import InterpreterError from "./error"

export const simulateInputState = atom<string>({
  key: "atoms/_simulateInput",
  default: "",
})

const _simulateResultState = atom<InterpreterOutput | null>({
  key: "atoms/_simulateResult",
  default: null,
})

export const simulateResultState = selector({
  key: "selector/simulateResultState",
  get: ({ get }) => {
    const result = get(_simulateResultState)
    if (result == null) {
      return null
    }

    let stacktrace = result.stacktrace.map((step) => {
      const node = get(nodeState(step.nodeId))
      if (node == null) {
        return null
      }
      const model = get(nodeModelState(node.modelId))
      return {
        ...step,
        node: {
          ...node,
          model,
        },
      }
    })

    // nullが含まれる場合、それ以降を削除する
    const nullIndex = stacktrace.findIndex((step) => step == null)

    // nullの直前のスタックトレースをエラーにする
    if (0 <= nullIndex) {
      stacktrace = stacktrace.slice(0, nullIndex)
      const prevNode = stacktrace.at(nullIndex - 1)!
      stacktrace[nullIndex - 1] = {
        nodeId: prevNode.nodeId,
        node: prevNode.node,
        type: "failure",
        error: new InterpreterError("NODE_NOT_FOUND", "ノードが見つかりません"),
      }
    }

    return {
      ...result,
      stacktrace: stacktrace as (Stacktrace[number] & { node: any })[],
    }
  },
})

export const useSimulateInput = () => useRecoilState(simulateInputState)

export const useRunInterpreter = () => {
  const result = useRecoilValue(simulateResultState)

  const run = useRecoilCallback(
    ({ snapshot, set }) =>
      async (environment: Environment["environment"], startNodeId?: string) => {
        const simulateInput = snapshot
          .getLoadable(simulateInputState)
          .getValue()
        const program = snapshot.getLoadable(programState).getValue()
        const mocks = snapshot.getLoadable(mocksState).getValue()
        const res = await runInterpreter(
          simulateInput,
          program,
          { environment },
          {
            startNodeId,
            mocks,
          },
        )
        set(_simulateResultState, res)
        return res
      },
    [],
  )

  return useMemo(() => ({ data: result, runInterpreter: run }), [result, run])
}

export const automaticRunInterpreter = selector({
  key: "selector/AutomaticInterpreter",
  get: async ({ get }) => {
    const runMode = get(runModeState)
    if (runMode !== "realtime") {
      return null
    }

    const simulateInput = get(simulateInputState)
    const program = get(programState)
    const mocks = get(mocksState)
    const res = await runInterpreter(
      simulateInput,
      program,
      { environment: "debugger" },
      { mocks },
    )
    return {
      ...res,
      stacktrace: res.stacktrace.map((step) => {
        const node = get(nodeState(step.nodeId))
        const model = get(nodeModelState(node.modelId))
        return {
          ...step,
          node: {
            ...node,
            model,
          },
        }
      }),
    }
  },
})

export const useAutomaticRunInterpreter = () =>
  useRecoilValue(automaticRunInterpreter)
