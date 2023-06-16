"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { getAccount } from "@/lib/appwrite/core"

const UnAuthRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const account = getAccount()
      const user = await account.get()
      if (user == null) {
        router.push("/login")
      }
    })()
  }, [router])

  return null
}

export default UnAuthRedirect
