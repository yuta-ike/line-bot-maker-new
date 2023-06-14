import { selector } from "recoil"

import { chatHistoryState } from "@/beta/components/SidePanel/Emulator/chatHistory"
import { simulateInputState } from "@/beta/interpreter/hook"

import { blockNodesState } from "../selector/blockNode"
import { blockEdgesState } from "../selector/blockEdge"

export const serializedProgramState = selector({
  key: "selector/serializedProgram",
  get: ({ get }) => {
    const blockNodes = get(blockNodesState)
    const blockEdges = get(blockEdgesState)
    return { nodes: blockNodes, edges: blockEdges }
  },
})

export const serializedDebuggerState = selector({
  key: "selector/serializedDebugger",
  get: ({ get }) => {
    const chatHistory = get(chatHistoryState)
    const simulatorInput = get(simulateInputState)
    return { simulatorInput, chatHistory }
  },
})
