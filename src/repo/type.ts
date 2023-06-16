import { ChatItem } from "@/beta/components/SidePanel/Emulator/chatHistory"
import { BlockEdge } from "@/beta/services/selector/blockEdge"
import { BlockNode } from "@/beta/services/selector/blockNode"

export type ProgramSchema = {
  id: string
  title: string
  createdBy: {
    id: string
    name: string
  }
  description: string
  instruction: string
  example: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export type ProgramDetailSchema = ProgramSchema & {
  program: {
    nodes: BlockNode[]
    edges: BlockEdge[]
  }
  debugState: {
    simulatorInput: string
    chatHistory: ChatItem[]
  }
}
