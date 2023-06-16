import Link from "next/link"
import React from "react"

import AppLogo from "@/beta/view/atoms/AppLogo"

import MenuItem from "./MenuItem"
import UserBox from "./UserBox"

const Header: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 flex h-[var(--header-height)] w-full items-center justify-start border-b border-slate-200 bg-white/90 px-8 py-4">
      <Link href="/dashboard">
        <AppLogo />
      </Link>
      <div className="ml-12 flex items-center space-x-8">
        <MenuItem href="/dashboard">My works</MenuItem>
        <MenuItem href="/explore">Explore</MenuItem>
        <div className="text-sm font-bold text-slate-400">
          Extension Blocks 🚧
        </div>
      </div>
      <UserBox className="ml-auto" />
    </header>
  )
}

export default Header
