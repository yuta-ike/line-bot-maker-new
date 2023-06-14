import { selector } from "recoil"

import { Program } from "@/beta/models/Program"

import { nodesState } from "../node/node"
import { edgesState } from "../atoms/edge"

export const programState = selector<Program>({
  key: "selector/program",
  get: ({ get }) => {
    const nodes = get(nodesState)
    const edges = get(edgesState)
    return {
      nodes,
      edges,
    }
  },
})
