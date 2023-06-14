import classNames from "classnames"
import Link from "next/link"
import React from "react"
import { FiEdit3 } from "react-icons/fi"

export type WordCardProps = {
  className?: string
}

const WorkCard: React.FC<WordCardProps> = ({ className }) => {
  return (
    <Link
      href="/work/001"
      className={classNames(
        "overflow-hidden rounded-xl bg-white shadow-card transition-all hover:scale-105 hover:shadow-xl active:scale-90 active:shadow-none",
        className,
      )}
    >
      <div className="relative h-[100px] w-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500">
        <div
          className="absolute bottom-2 right-2 rounded-full border-2 border-white bg-white/10 px-3 py-1 text-xs font-bold text-white"
          style={{ textShadow: "0px 0px 2px rgb(0 0 0 / 0.2)" }}
        >
          公開中
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-bold">天気予報プログラム</div>
        <div className="mt-1 flex items-center space-x-1 text-slate-400">
          <FiEdit3 size={12} />
          <time className="text-xs">2022/12/3</time>
        </div>
      </div>
    </Link>
  )
}

export default WorkCard
