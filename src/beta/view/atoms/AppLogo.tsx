import React from "react"

const AppLogo: React.FC = () => {
  return (
    <h1 className="flex items-center text-lg font-bold group text-slate-800">
      <div className="relative inline w-10 h-10 mr-2 overflow-hidden shadow animate-gradient rounded-2xl bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200 before:absolute before:inset-0 before:bg-red-400 before:bg-gradient-to-bl before:from-pink-400 before:via-orange-400 before:to-yellow-500 before:opacity-0 before:transition-all group-hover:shadow-lg group-hover:duration-500 group-hover:before:opacity-100" />
      ボットラボ
    </h1>
  )
}

export default AppLogo
