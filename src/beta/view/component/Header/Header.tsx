import Link from "next/link"
import React from "react"

import AppLogo from "@/beta/view/atoms/AppLogo"

import MenuItem from "./MenuItem"

const Header: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 flex h-[var(--header-height)] w-full items-center justify-start border-b border-slate-200 bg-white/90 px-8 py-4">
      <Link href="/dashboard">
        <AppLogo />
      </Link>
      <div className="flex items-center ml-12 space-x-8">
        <MenuItem href="/dashboard">わたしの作品</MenuItem>
        <div className="text-sm font-bold text-slate-400">みんなの作品 🚧</div>
        <div className="text-sm font-bold text-slate-400">拡張ブロック 🚧</div>
      </div>
      <div className="flex items-center ml-auto space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200" />
        <div>Yuta</div>
      </div>
    </header>
  )
}

export default Header
