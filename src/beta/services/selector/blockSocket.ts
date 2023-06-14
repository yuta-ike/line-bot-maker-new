import { selectorFamily, useRecoilValue } from "recoil"

import { socketState } from "../atoms/socket"
import { socketRectState } from "../atoms/socketRect"

type BlockSocketStateArgs = {
  nodeId: string
  socketId: string
  type: "input" | "output"
}

export const blockSoketState = selectorFamily({
  key: "atom/blockSocketState",
  get:
    (args: BlockSocketStateArgs) =>
    ({ get }) => {
      const socket = get(socketState(args))
      const rect = get(socketRectState(args))

      return {
        ...socket,
        rect,
      }
    },
})

export const useBlockSocket = (args: BlockSocketStateArgs) =>
  useRecoilValue(blockSoketState(args))
