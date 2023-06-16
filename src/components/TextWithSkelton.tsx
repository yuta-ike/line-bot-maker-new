import React from "react"

import TextSkelton from "./TextSkelton"

export type TextWithSkeltonProps = {
  children?: string | null | undefined
  as?: keyof JSX.IntrinsicElements
  skeltonWidth?: number
  className?: string
}

const TextWithSkelton = ({
  as: Component = "div",
  skeltonWidth,
  ...props
}: TextWithSkeltonProps) => {
  if (props.children == null) {
    return <TextSkelton className={props.className} width={skeltonWidth} />
  }
  return <Component {...props} />
}

export default TextWithSkelton
