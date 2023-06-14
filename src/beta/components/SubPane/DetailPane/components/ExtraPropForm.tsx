import React, { useId } from "react"
import TextareaAutosize from "react-textarea-autosize"

import { useExtraPropsOperation } from "@/beta/services/node/node"
import { ExtraProp } from "@/beta/models/NodeModel"
import { GLOBAL_MAGIC_VARIABLES } from "@/beta/models/MagicVariables"

import Heading from "./Heading"

export type ExtraPropFormProps = {
  nodeId: string
  extraProp: ExtraProp
}

const ExtraPropForm: React.FC<ExtraPropFormProps> = ({ nodeId, extraProp }) => {
  const [value, updateExtraProp] = useExtraPropsOperation(nodeId, extraProp.id)
  const inputId = useId()

  if (extraProp.type === "string") {
    return (
      <div>
        <Heading id={inputId}>{extraProp.label}</Heading>
        <TextareaAutosize
          className="peer mt-2 w-[calc(100%+32px)] -translate-x-4 resize-none bg-slate-400/20 px-4 py-2 text-sm focus:bg-slate-400/10 focus:outline-none"
          aria-labelledby={inputId}
          minRows={2}
          value={value as string}
          onChange={(e) => updateExtraProp(e.target.value)}
          placeholder={extraProp.placeholder}
        />
        <div className="flex flex-wrap h-0 overflow-hidden focus-within:h-auto peer-focus:h-auto">
          {[...extraProp.localMagicVariables, ...GLOBAL_MAGIC_VARIABLES].map(
            ({ type, label }) => (
              <button
                key={type}
                onClick={() => updateExtraProp(`${value ?? ""}{${type}}`)}
                className="mr-1 mt-0.5 cursor-pointer rounded bg-slate-600 px-2 py-0.5 text-xs font-bold text-white"
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ExtraPropForm
