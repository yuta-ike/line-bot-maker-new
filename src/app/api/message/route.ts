import { NextRequest } from "next/server"

import { runInterpreter } from "@/beta/interpreter"
import { getProgram } from "@/repo/admin/getProgram"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const input = body.input
  const res = await getProgram(body.id)

  console.log(JSON.stringify(res))

  const resumeId = body.resumeId

  try {
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

    console.log(JSON.stringify(answer))

    return answer.result
  } catch (e) {
    return JSON.stringify(e)
  }
}
