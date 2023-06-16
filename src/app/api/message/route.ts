import { NextRequest, NextResponse } from "next/server"

import { runInterpreter } from "@/beta/interpreter"
import { getProgram } from "@/repo/admin/getProgram"
import { updateStatistics } from "@/repo/admin/updateStatistics"

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const id = body.id

  const input = body.input
  const res = await getProgram(id)

  const resumeId = body.resumeId

  const answer = await runInterpreter(
    input,
    {
      //@ts-ignore
      nodes: res.program.nodes.map(({ node }) => node),
      //@ts-ignore
      edges: res.program.edges.map((edge) => edge),
    },
    { environment: "production" },
    { startNodeId: resumeId },
  )

  await updateStatistics(id, answer.result.type === "success")

  return NextResponse.json(answer.result)
}
