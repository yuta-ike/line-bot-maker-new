"use client"

import React from "react"
import Link from "next/link"

import { getAccount } from "@/lib/appwrite/core"

const LoginPage = () => {
  const login = (provider: "discord" | "slack") => {
    const account = getAccount()
    try {
      account.createOAuth2Session(
        provider,
        "https://bot-labo.vercel.app/dashboard",
        "https://bot-labo.vercel.app/login",
      )
    } catch (e: any) {
      console.error(`${e.message}`)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <button
        className="rounded-lg border border-slate-200 bg-slate-600 px-6 py-3 text-center font-bold text-white shadow transition hover:shadow-xl active:translate-y-0.5 active:shadow-none"
        onClick={() => login("discord")}
      >
        Login with Discord
      </button>
      <Link
        href="/login/email"
        className="rounded-lg border border-slate-200 bg-slate-600 px-6 py-3 text-center font-bold text-white shadow transition hover:shadow-xl active:translate-y-0.5 active:shadow-none"
      >
        Login with Email
      </Link>
    </div>
  )
}

export default LoginPage
