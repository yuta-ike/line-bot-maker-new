import React from "react"

import { UiStruct } from "@/beta/models/UiModel"
import { useExtraPropsOperation } from "@/beta/services/node/node"

import UiIcon from "./UiIcon"

export type UiStructProps = {
  nodeId: string
  struct: UiStruct
}

const UiStruct: React.FC<UiStructProps> = ({ nodeId, struct }) => {
  if (struct.type === "flex-col") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="w-full space-x-2"
      >
        {struct.children.map((child, i) => (
          <div
            key={i}
            style={
              child.fillType === "grow" ? { flexGrow: 1 } : { flexShrink: 0 }
            }
          >
            <UiStruct nodeId={nodeId} struct={child.child} />
          </div>
        ))}
      </div>
    )
  } else if (struct.type === "flex-row") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="w-full space-x-2"
      >
        {struct.children.map((child, i) => (
          <div
            key={i}
            style={
              child.fillType === "grow" ? { flexGrow: 1 } : { flexShrink: 0 }
            }
          >
            <UiStruct nodeId={nodeId} struct={child.child} />
          </div>
        ))}
      </div>
    )
  } else if (struct.type === "text") {
    return (
      <div
        style={{
          fontSize: "14px",
          fontWeight: struct.typo === "title" ? "bold" : "normal",
        }}
      >
        {struct.text}
      </div>
    )
  } else if (struct.type === "icon") {
    if (struct.iconType === "text") {
      return <div className="text-center text-lg font-bold">{struct.text}</div>
    } else {
      return <UiIcon iconName={struct.iconName} />
    }
  } else if (struct.type === "input") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, updateExtraProp] = useExtraPropsOperation(nodeId, struct.id)
    return (
      <input
        className="w-full rounded px-1 py-1 text-xs text-slate-700 focus:outline-none"
        value={value as string}
        onChange={(e) => {
          updateExtraProp(e.target.value)
        }}
        placeholder={struct.placeholder}
      />
    )
  }

  throw new Error("Unsupported struct type")
}

export default UiStruct
