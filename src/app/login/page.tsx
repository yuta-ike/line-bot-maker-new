"use client"

import React from "react"

import { getAccount } from "@/lib/appwrite/core"

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
    <div className="grid h-screen place-items-center bg-orange-400">
      <div className="flex flex-col items-center space-y-16 rounded-xl border border-slate-200 bg-white p-16 shadow">
        <h2 className="text-2xl font-bold">Bot Labo</h2>
        <button
          className="rounded-lg border border-slate-200 px-6 py-4 shadow"
          onClick={loginWithDiscord}
        >
          Login With Discord
        </button>
      </div>
      {/* <button onClick={installGlobalCommands}>ATTACH</button> */}
    </div>
  )
}

export default LoginPage
