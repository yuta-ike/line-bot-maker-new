import { NextRequest } from "next/server"

import { runInterpreter } from "@/beta/interpreter"
import { getProgramDetails } from "@/repo/getProgramDetails"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const input = body.input
  const res = await getProgramDetails(body.id)
  const resumeId = body.resumeId

  const answer = await runInterpreter(
    input,
    {
      nodes: res.program.nodes.map(({ node }) => node),
      edges: res.program.edges.map((edge) => edge),
    },
    { environment: "production" },
    { startNodeId: resumeId },
  )

  return answer.result
}
