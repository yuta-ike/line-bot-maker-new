import classNames from "classnames"
import React from "react"

export type TextSkeltonProps = {
  row?: number
  className?: string
}

const TextSkelton = ({ row = 1, className }: TextSkeltonProps) => {
  return (
    <div
      style={{ height: `${row}lh` }}
      className={classNames("animate-pulse rounded bg-slate-200", className)}
    />
  )
}

export default TextSkelton
