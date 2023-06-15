"use client"

import React from "react"

import { getAccount } from "@/lib/appwrite/core"
import { installGlobalCommands } from "@/utils/installDiscordCommand"

const LoginPage = () => {
  const loginWithDiscord = () => {
    const account = getAccount()
    try {
      account.createOAuth2Session(
        "discord",
        "http://localhost:3000/redirect",
        "http://localhost:3000/500",
      )
    } catch (e: any) {
      console.error(`${e.message}`)
    }
  }

  return (
    <div>
      <button onClick={loginWithDiscord}>Login With Discord</button>
      <button onClick={installGlobalCommands}>ATTACH</button>
    </div>
  )
}

export default LoginPage
