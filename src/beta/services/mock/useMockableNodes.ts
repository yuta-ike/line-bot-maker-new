import { BlockNode, useBlockNodes } from "../selector/blockNode"

export type MockableBlockNode = BlockNode & { nodeModel: { mock: any } }

export const useMockableNodes = () => {
  const nodes = useBlockNodes()

  const mockableNodes = nodes.filter(
    (node): node is MockableBlockNode => node.model.mock != null,
  )

  return mockableNodes
}
