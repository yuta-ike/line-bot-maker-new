import React from "react"
import { FiChevronDown, FiCopy, FiEdit, FiTrash2 } from "react-icons/fi"

import Tooltip from "@/beta/view/atoms/Tooltop"
import { NodeModel } from "@/beta/models/NodeModel"
import { useSelectedNodeOperation } from "@/beta/services/select/selectNodeOperation"

import Hr from "./components/Hr"
import Heading from "./components/Heading"
import { SocketButton, SocketLabel } from "./components/SocketButton"
import ExtraPropForm from "./components/ExtraPropForm"

export type NodeDetailPaneProps = {
  nodeId: string
  model: NodeModel
}

const NodeDetailPane: React.FC<NodeDetailPaneProps> = ({ nodeId, model }) => {
  // node operation
  const { duplicateNodes, removeNodes } = useSelectedNodeOperation()

  return (
    <div>
      {/* Tab */}
      <div className="flex items-center space-x-4">
        {["inspect", "log"].map((type) => (
          <div key={type} className="text-sm font-bold text-slate-400">
            {type}
          </div>
        ))}
      </div>
      <Hr />

      {/* Title */}
      <section>
        <div className="flex items-center space-x-4">
          <input
            className="w-full rounded border border-transparent text-lg font-bold focus:border-slate-600/20 focus:outline-none"
            value={`${model.meta.name}-1`}
            onChange={() => {}}
          />
          <Tooltip label="Edit">
            <button className="shrink-0 text-slate-400">
              <FiEdit />
            </button>
          </Tooltip>
        </div>
        <div className="mt-0.5 flex items-center text-xs text-slate-600">
          <span>{model.meta.name}</span>
          <Tooltip label="Make changes to other blocks">
            <button
              aria-label="Make changes to other blocks"
              className="ml-1 rounded p-1 transition hover:bg-black/10"
            >
              <FiChevronDown />
            </button>
          </Tooltip>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex flex-wrap items-center">
            <SocketLabel className="mr-4">Input</SocketLabel>
            {model.sockets.input.map(({ id, label }) => (
              <SocketButton key={id} nodeId={nodeId} socketId={id}>
                {label}
              </SocketButton>
            ))}
            {model.sockets.input.length === 0 && (
              <div className="flex h-[22px] items-center text-xs font-bold text-slate-600">
                -
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center">
            <SocketLabel className="mr-4">Output</SocketLabel>
            {model.sockets.output.map(({ id, label }) => (
              <SocketButton key={id} nodeId={nodeId} socketId={id}>
                {label}
              </SocketButton>
            ))}
            {model.sockets.output.length === 0 && (
              <div className="flex h-[22px] items-center text-xs font-bold text-slate-600">
                -
              </div>
            )}
          </div>
        </div>
      </section>
      <Hr />

      {/* Layer */}
      {/* <section>
        <Heading>レイヤー</Heading>
        <div className="mt-2 flex w-max items-center rounded border border-slate-200 px-3 py-1">
          <div className="text-xs">レイヤー1</div>
          <div aria-label="他のブロックに変更" className="ml-2 p-1">
            <FiChevronDown strokeWidth={1} />
          </div>
        </div>
      </section>
      <Hr /> */}

      {/* Extra Props */}
      {0 < (model.extraProps?.length ?? 0) && (
        <>
          <section>
            {model.extraProps?.map((extraProp) => (
              <ExtraPropForm
                key={extraProp.id}
                nodeId={nodeId}
                extraProp={extraProp}
              />
            ))}
          </section>
          <Hr />
        </>
      )}

      {/* Action Buttons */}
      <section>
        <Heading>Operation</Heading>
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

      {/* Description */}
      <section>
        <Heading>Explanation</Heading>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {model.meta.description}
        </p>
      </section>
    </div>
  )
}

export default NodeDetailPane
