import React from "react"

const AppLogo: React.FC = () => {
  return (
    <h1 className="group flex items-center text-lg font-bold text-slate-800">
      <div className="animate-gradient relative mr-2 inline h-10 w-10 overflow-hidden rounded-2xl bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow shadow-orange-200 before:absolute before:inset-0 before:bg-red-400 before:bg-gradient-to-bl before:from-pink-400 before:via-orange-400 before:to-yellow-500 before:opacity-0 before:transition-all group-hover:shadow-lg group-hover:duration-500 group-hover:before:opacity-100" />
      Bot Labo
    </h1>
  )
}

export default AppLogo
