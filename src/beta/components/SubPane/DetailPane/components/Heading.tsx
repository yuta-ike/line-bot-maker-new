import classNames from "classnames"
import React from "react"

export type HeadingProps = {
  className?: string
  children: string
} & React.ComponentProps<"h4">

const Heading: React.FC<HeadingProps> = ({ className, children, ...props }) => {
  return (
    <h4
      className={classNames("text-xs font-bold text-slate-600", className)}
      {...props}
    >
      {children}
    </h4>
  )
}

export default Heading
