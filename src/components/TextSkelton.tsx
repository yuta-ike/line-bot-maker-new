import classNames from "classnames"
import React from "react"

export type TextSkeltonProps = {
  row?: number
  className?: string
  width?: number
}

const TextSkelton = ({ row = 1, width, className }: TextSkeltonProps) => {
  return (
    <div
      style={{ height: `${row}lh`, width }}
      className={classNames("animate-pulse rounded bg-slate-200", className)}
    />
  )
}

export default TextSkelton
