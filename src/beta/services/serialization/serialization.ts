import { selector } from "recoil"

import { chatHistoryState } from "@/beta/components/SidePanel/Emulator/chatHistory"
import { simulateInputState } from "@/beta/interpreter/hook"

import { blockNodesState } from "../selector/blockNode"
import { blockEdgesState } from "../selector/blockEdge"

const serializedProgramState = selector({
  key: "selector/serializedProgram",
  get: ({ get }) => {
    const blockNodes = get(blockNodesState)
    const blockEdges = get(blockEdgesState)
    return { nodes: blockNodes, edges: blockEdges }
  },
})

const serializedDebuggerState = selector({
  key: "selector/serializedDebugger",
  get: ({ get }) => {
    const chatHistory = get(chatHistoryState)
    const simulatorInput = get(simulateInputState)
    return { simulatorInput, chatHistory }
  },
})

export const snapshotState = selector({
  key: "selector/snapshot",
  get: ({ get }) => {
    const program = get(serializedProgramState)
    const debugState = get(serializedDebuggerState)
    return { program, debugState }
  },
})
