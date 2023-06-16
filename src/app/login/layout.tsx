import React from "react"

import AppLogo from "@/beta/view/atoms/AppLogo"

type LoginLayoutProps = {
  children: React.ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div
      className="grid h-screen place-items-center"
      style={{
        background: "radial-gradient(rgb(251 146 60) 0%, rgb(251 146 60) 50%)",
      }}
    >
      <div className="flex flex-col items-center space-y-16 rounded-xl border border-slate-200 bg-white p-16 shadow">
        <AppLogo />
        {children}
      </div>
    </div>
  )
}

export default LoginLayout
