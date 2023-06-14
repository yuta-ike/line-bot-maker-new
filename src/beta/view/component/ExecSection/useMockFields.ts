import { useMockableNodes } from "@/beta/services/mock/useMockableNodes"
import { useBlockNode } from "@/beta/services/selector/blockNode"

export const useMockableNodeIds = () => {
  const mockableNodes = useMockableNodes()
  return mockableNodes.map(({ node }) => node.id)
}

export const useBlockNodeWithMock = (id: string) => {
  const node = useBlockNode(id)
  // const [mockValue] = useMockValue(id)

  return {
    id: node.node.id,
    mockType: node.model.mock!.type,
    name: node.model.meta.name,
    options: node.model.sockets.output.map((socket) => ({
      id: socket.id,
      label: socket.label,
    })),
  }
}

// export const useMockField = () => {
//   const mockableNodes = useMockableNodes()

//   return mockableNodes.map((node) => ({
//     id: node.node.id,
//     mockType: node.model.mock!.type,
//     name: node.model.meta.name,
//     options: node.model.sockets.output.map((socket) => ({
//       id: socket.id,
//       label: socket.label,
//     })),
//   }))
// }
