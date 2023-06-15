import { NextRequest, NextResponse } from "next/server"

import { runInterpreter } from "@/beta/interpreter"
import { getProgram } from "@/repo/admin/getProgram"

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  console.log("===========================")
  console.log(body)

  const input = body.input
  const res = await getProgram(body.id)

  // @ts-ignore
  console.log(JSON.stringify(res.program))

  const resumeId = body.resumeId
  console.log("---------------------", resumeId)

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

    return NextResponse.json(answer)
  } catch (e) {
    console.log(JSON.stringify(e))

    return JSON.stringify(e)
  }
}
