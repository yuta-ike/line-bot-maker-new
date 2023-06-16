import classNames from "classnames"
import format from "date-fns/format"
import Link from "next/link"
import React from "react"
import { FiEdit3 } from "react-icons/fi"

import { ProgramSchema } from "@/repo/type"
import TextSkelton from "@/components/TextSkelton"

export type WordCardProps = {
  program: ProgramSchema
  className?: string
}

const WorkCard = ({ program, className }: WordCardProps) => {
  return (
    <Link
      href={`/work/${program.id}`}
      className={classNames(
        "flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:rotate-2 hover:scale-105 hover:shadow-xl active:scale-90 active:shadow-none",
        className,
      )}
    >
      <div className="relative h-[100px] w-full shrink-0 bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500">
        <div className="absolute inset-x-4 top-4 text-lg font-bold text-white">
          {program.title}
        </div>

        <div className="absolute bottom-1 right-1 rounded px-2 py-1 text-sm font-bold text-white backdrop-blur">
          {program.createdBy.name}
        </div>
      </div>
      <div className="flex h-full flex-col p-4 pt-3">
        <div className="mb-3 line-clamp-2 text-sm text-slate-500">
          {program.description}
        </div>
        <div className="mt-auto flex items-center space-x-1 text-slate-400">
          <FiEdit3 size={12} />
          <time className="text-xs">
            {format(new Date(program.updatedAt), "yyyy/M/d")}
          </time>
        </div>
      </div>
    </Link>
  )
}

export default WorkCard

export type WorkCardSkeltonProps = {
  className?: string
}
export const WorkCardSkelton = ({ className }: WorkCardSkeltonProps) => {
  return (
    <div
      className={classNames(
        "overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:rotate-2 hover:scale-105 hover:shadow-xl active:scale-90 active:shadow-none",
        className,
      )}
    >
      <div className="relative h-[100px] w-full bg-slate-100">
        <TextSkelton
          className="absolute bottom-1 right-1 rounded px-2 py-1 text-sm font-bold text-white opacity-50 backdrop-blur"
          width={60}
        />
      </div>
      <div className="p-4">
        <TextSkelton className="w-full text-sm font-bold" />
        <div className="mt-1 flex items-center space-x-1 text-slate-400">
          <FiEdit3 size={12} />
          <TextSkelton className="w-[48px] text-xs" />
        </div>
      </div>
    </div>
  )
}
