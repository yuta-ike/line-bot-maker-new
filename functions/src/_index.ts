const TOKEN = process.env["DISCORD_BOT_TOKEN"] as string

// Create REST instance

const handler = async (
  req: {
    payload: string
    header: Record<string, unknown>
    variables: Record<string, string>
  },
  res: {
    send: (text: string, status?: number) => void
    json: (data: Record<string, unknown>, status?: number) => void
  },
) => {
  const payload = JSON.parse(req.payload)
  // PING
  if (payload["type"] === 1) {
    res.json({
      type: 1,
    })
    return
  }

  res.json({
    payload: {
      payload: req.payload,
      header: req.header,
    },
  })

  // const payload =
  //   req.payload ||
  //   "No payload provided. Add custom data when executing function."
  // const secretKey =
  //   req.variables.SECRET_KEY ||
  //   "SECRET_KEY variable not found. You can set it in Function settings."
  // const randomNumber = Math.random()
  // const trigger = req.variables.APPWRITE_FUNCTION_TRIGGER
  // res.json({
  //   message: "Hello from Appwrite!",
  //   payload,
  //   secretKey,
  //   randomNumber,
  //   trigger,
  // })
}

export = handler
