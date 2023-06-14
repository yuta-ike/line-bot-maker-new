import React from "react"

import Header from "@/beta/view/component/Header/Header"

export type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />
      <div className="mt-[var(--header-height)]">{children}</div>
    </div>
  )
}

export default Layout
