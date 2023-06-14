import classNames from "classnames"
import format from "date-fns/format"
import Link from "next/link"
import React from "react"
import { FiEdit3 } from "react-icons/fi"

import { ProgramSchema } from "@/repo/type"
import TextSkelton from "@/components/TextSkelton"

import PublicationStatusBadge from "./PublicationStatusBadge"

export type WordCardProps = {
  program: ProgramSchema
  className?: string
}

const WorkCard: React.FC<WordCardProps> = ({ program, className }) => {
  return (
    <Link
      href={`/work/${program.id}`}
      className={classNames(
        "overflow-hidden rounded-xl bg-white shadow-card transition-all hover:scale-105 hover:shadow-xl active:scale-90 active:shadow-none",
        className,
      )}
    >
      <div className="relative h-[100px] w-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500">
        <PublicationStatusBadge
          isPublic={program.isPublic}
          className="absolute bottom-2 right-2"
        />
      </div>
      <div className="p-4">
        <div className="text-sm font-bold">{program.title}</div>
        <div className="mt-1 flex items-center space-x-1 text-slate-400">
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
        "overflow-hidden rounded-xl bg-slate-100",
        className,
      )}
    >
      <div className="relative h-[100px] w-full animate-pulse bg-slate-200" />
      <div className="p-4">
        <TextSkelton className="text-sm font-bold" />
        <div className="mt-1 flex items-center space-x-1 text-slate-400">
          <div className="h-3 w-3" />
          <TextSkelton className="text-xs" />
        </div>
      </div>
    </div>
  )
}
