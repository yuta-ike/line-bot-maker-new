import React from "react"

import TextSkelton from "./TextSkelton"

export type TextWithSkeltonProps = {
  children?: string | null | undefined
  as?: keyof JSX.IntrinsicElements
  className?: string
}

const TextWithSkelton = ({
  as: Component = "div",
  ...props
}: TextWithSkeltonProps) => {
  if (props.children == null) {
    return <TextSkelton className={props.className} />
  }
  return <Component {...props} />
}

export default TextWithSkelton
