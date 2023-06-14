"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import { getAccount, getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

const RedirectPage = () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const account = getAccount()
      const database = getDatabase()
      const user = await account.get()
      await database.createDocument(DATABASE_ID, collections.user, user.$id, {
        name: user.name,
      })

      router.push("/dashboard")
    })()
  }, [router])

  return <div>page</div>
}

export default RedirectPage
