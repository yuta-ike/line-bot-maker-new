import { NextRequest, NextResponse } from "next/server"

import { getProgram } from "@/repo/admin/getProgram"

import { checkSecurity } from "./_logic/checkSecurity"

export const POST = async (request: NextRequest) => {
  const json = await checkSecurity(request)

  const ID = "urynar98"

  const data = await getProgram(ID)

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

  console.log(ID)
  console.log(data)

  return NextResponse.json({
    type: 4,
    data: {
      content: "hello world",
    },
  })
}
