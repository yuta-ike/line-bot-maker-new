"use client"

import React from "react"

import { getAccount } from "@/lib/appwrite/core"

const AccountPage = () => {
  const handleLogOut = () => {
    const account = getAccount()
    account.deleteSession("current")
  }

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default AccountPage
