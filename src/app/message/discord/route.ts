import { NextRequest, NextResponse } from "next/server"
import nacl from "tweetnacl"

const DISCORD_PUBLIC_KEY = process.env["DISCORD_PUBLIC_KEY"]

if (DISCORD_PUBLIC_KEY == null) {
  throw new Error()
}

export const POST = async (request: NextRequest) => {
  console.log("POST!!!!!!!!!!!!!!!!!!!")

  // SECURITY CHECK
  const rawBody = await request.text()

  const signature = request.headers.get("x-signature-ed25519")
  const timestamp = request.headers.get("x-signature-timestamp")

  if (signature == null || timestamp == null) {
    return new NextResponse("Invalid header", { status: 400 })
  }

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, "hex"),
    Buffer.from(DISCORD_PUBLIC_KEY, "hex"),
  )

  if (!isVerified) {
    return new NextResponse("Invalid header", { status: 400 })
  }

  const json = JSON.parse(rawBody)
  console.log(json?.type)

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

  console.log(json)

  // 実装 414464863296
}
