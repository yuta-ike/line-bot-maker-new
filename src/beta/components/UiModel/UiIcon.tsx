import React from "react"
import { TbMessageCircle, TbQuestionMark } from "react-icons/tb"

export type UiIconProps = {
  iconName: "chat" | string
}

const UiIcon: React.FC<UiIconProps> = ({ iconName }) => {
  if (iconName === "chat") {
    return <TbMessageCircle size={40} />
  } else {
    return <TbQuestionMark size={40} />
  }
}

export default UiIcon
