import { DataType } from "./NodeModel"

export type Program = {
  nodes: {
    id: string
    modelId: string
    extraProps: Record<string, unknown>
  }[]
  edges: {
    id: string
    from: {
      id: string
      socketId: string
    }
    to: {
      id: string
      socketId: string
    }
    type: DataType
  }[]
}
