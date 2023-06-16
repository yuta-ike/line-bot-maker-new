"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { getAccount } from "@/lib/appwrite/core"

const AccountPage = () => {
  const router = useRouter()
  const handleLogOut = async () => {
    const account = getAccount()
    await account.deleteSession("current")
    router.push("/login")
  }

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default AccountPage
