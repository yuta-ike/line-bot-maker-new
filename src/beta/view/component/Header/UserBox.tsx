"use client"

import React from "react"
import classNames from "classnames"
import Link from "next/link"

import { useUser } from "@/lib/appwrite/auth"

export type UserBoxProps = {
  className?: string
}

const UserBox = ({ className }: UserBoxProps) => {
  const { data: user } = useUser()

  return (
    <Link
      href="/account"
      className={classNames("flex items-center space-x-2", className)}
    >
      <div
        className={classNames(
          "h-8 w-8 rounded-full",
          user != null
            ? "bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200"
            : "animate-pulse bg-slate-200",
        )}
      />
      {user != null ? (
        <div>{user?.name}</div>
      ) : (
        <div
          style={{ height: "1lh" }}
          className="w-[64px] animate-pulse rounded bg-slate-200"
        />
      )}
    </Link>
  )
}

export default UserBox
