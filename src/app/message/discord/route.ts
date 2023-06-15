import { NextRequest, NextResponse } from "next/server"

import { checkSecurity } from "./_logic/checkSecurity"

export const POST = async (request: NextRequest) => {
  const json = await checkSecurity(request)

  console.log(json)

  const ID = "urynar98"

  // const data = await getProgram(ID)
  // const program = data.program

  // runInterpreter()

  // PING
  if (json.type === 1) {
    return NextResponse.json(
      {
        type: 1,
      },
      {
        status: 200,
      },
    )
  }

  return NextResponse.json({
    type: 4,
    data: {
      content: "hello world",
    },
  })
}
