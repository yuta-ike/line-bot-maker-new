import React from "react"
import { FiCopy, FiTrash2 } from "react-icons/fi"

import Tooltip from "@/beta/view/atoms/Tooltop"
import { useSelectedNodeOperation } from "@/beta/services/select/selectNodeOperation"
import { ALIGNS } from "@/beta/services/align/align"
import { useIsSelectedOperation } from "@/beta/services/select/select"

import Hr from "./components/Hr"
import Heading from "./components/Heading"

export type MultiDetailPaneProps = {
  selectedCount: number
}

const MultiDetailPane: React.FC<MultiDetailPaneProps> = ({ selectedCount }) => {
  // node operation
  const { duplicateNodes, removeNodes } = useSelectedNodeOperation()

  // select operation
  const { clearSelect } = useIsSelectedOperation()

  return (
    <div>
      <div className="flex w-full items-center justify-between rounded border border-transparent text-lg font-bold focus:border-slate-600/20 focus:outline-none">
        <div>{selectedCount} items selected</div>
        <button
          className="inline text-sm text-slate-400 transition hover:text-slate-600"
          onClick={clearSelect}
        >
          Clear
        </button>
      </div>
      <Hr />

      {/* Layer */}
      {/* <section>
        <Heading>レイヤー化</Heading>
        <button className="mt-2 flex w-full items-center justify-center space-x-2 rounded border border-slate-400 px-2 py-2 text-sm transition hover:bg-slate-50 active:translate-y-0.5 active:shadow-none">
          <MdOutlineLayers size={18} />
          <span>レイヤーにまとめる</span>
        </button>
      </section>
      <Hr /> */}

      {/* Action Buttons */}
      <section>
        <Heading>Bulk operation</Heading>
        <div className="mt-3 flex items-center space-x-2">
          <Tooltip label="Duplicate">
            <button
              className="rounded border border-slate-400 p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Duplicate"
              onClick={duplicateNodes}
            >
              <FiCopy />
            </button>
          </Tooltip>
          <Tooltip label="Delete">
            <button
              className="rounded border border-red-400 p-2 text-red-600 transition hover:bg-red-100"
              aria-label="Delete"
              onClick={removeNodes}
            >
              <FiTrash2 />
            </button>
          </Tooltip>
        </div>
      </section>
      <Hr />

      {/* Align */}
      <section>
        <Heading>Align</Heading>
        <div className="mt-3 flex flex-wrap place-items-center gap-2">
          {ALIGNS.map(({ id, label, Icon }) => (
            <Tooltip key={id} label={label}>
              <button
                className="aspect-square rounded border border-slate-400 p-2 text-slate-600 transition hover:bg-slate-100"
                aria-label={label}
                onClick={duplicateNodes}
              >
                <Icon />
              </button>
            </Tooltip>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MultiDetailPane
