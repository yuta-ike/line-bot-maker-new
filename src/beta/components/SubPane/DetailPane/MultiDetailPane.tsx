import React from "react"
import { FiCopy, FiTrash2 } from "react-icons/fi"
import { MdOutlineLayers } from "react-icons/md"

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
      <div className="flex items-center justify-between w-full text-lg font-bold border border-transparent rounded focus:border-slate-600/20 focus:outline-none">
        <div>{selectedCount}件を選択中</div>
        <button
          className="inline text-sm transition text-slate-400 hover:text-slate-600"
          onClick={clearSelect}
        >
          Clear
        </button>
      </div>
      <Hr />

      {/* Layer */}
      <section>
        <Heading>レイヤー化</Heading>
        <button className="mt-2 flex w-full items-center justify-center space-x-2 rounded border border-slate-400 px-2 py-2 text-sm transition hover:bg-slate-50 active:translate-y-0.5 active:shadow-none">
          <MdOutlineLayers size={18} />
          <span>レイヤーにまとめる</span>
        </button>
      </section>
      <Hr />

      {/* Action Buttons */}
      <section>
        <Heading>まとめて操作</Heading>
        <div className="flex items-center mt-3 space-x-2">
          <Tooltip label="複製">
            <button
              className="p-2 transition border rounded border-slate-400 text-slate-600 hover:bg-slate-100"
              aria-label="複製"
              onClick={duplicateNodes}
            >
              <FiCopy />
            </button>
          </Tooltip>
          <Tooltip label="削除">
            <button
              className="p-2 text-red-600 transition border border-red-400 rounded hover:bg-red-100"
              aria-label="削除"
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
        <Heading>整列</Heading>
        <div className="flex flex-wrap gap-2 mt-3 place-items-center">
          {ALIGNS.map(({ id, label, Icon }) => (
            <Tooltip key={id} label={label}>
              <button
                className="p-2 transition border rounded aspect-square border-slate-400 text-slate-600 hover:bg-slate-100"
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
