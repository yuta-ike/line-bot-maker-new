import classNames from "classnames"
import React from "react"

export type HrProps = {
  className?: string
}

const Hr: React.FC<HrProps> = ({ className }) => {
  return (
    <hr
      className={classNames(
        "my-4 w-[calc(100%+32px)] -translate-x-4",
        className,
      )}
    />
  )
}

export default Hr
