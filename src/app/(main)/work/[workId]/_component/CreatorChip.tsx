import React from "react"
import classNames from "classnames"

import TextSkelton from "@/components/TextSkelton"

export type CreatorChipProps = {
  name: string
  className?: string
}

const CreatorChip = ({ name, className }: CreatorChipProps) => {
  return (
    <button
      className={classNames(
        "flex items-center space-x-2 rounded-full border border-transparent p-1 pr-4 hover:border-slate-200",
        className,
      )}
    >
      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200" />
      <div>{name}</div>
    </button>
  )
}

export default CreatorChip

export type CreatorChipSkeltonProps = {
  className?: string
}

export const CreatorChipSkelton = ({ className }: CreatorChipSkeltonProps) => {
  return (
    <button
      className={classNames(
        "flex items-center space-x-2 rounded-full border border-transparent p-1 pr-4 hover:border-slate-200",
        className,
      )}
    >
      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200" />
      <TextSkelton className="w-[80px]" />
    </button>
  )
}
