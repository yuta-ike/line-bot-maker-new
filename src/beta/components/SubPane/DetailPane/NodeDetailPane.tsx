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
            className="w-full text-lg font-bold border border-transparent rounded focus:border-slate-600/20 focus:outline-none"
            value={`${model.meta.name}-1`}
            onChange={() => {}}
          />
          <Tooltip label="編集">
            <button className="shrink-0 text-slate-400">
              <FiEdit />
            </button>
          </Tooltip>
        </div>
        <div className="mt-0.5 flex items-center text-xs text-slate-600">
          <span>{model.meta.name}</span>
          <Tooltip label="他のブロックに変更">
            <button
              aria-label="他のブロックに変更"
              className="p-1 ml-1 transition rounded hover:bg-black/10"
            >
              <FiChevronDown />
            </button>
          </Tooltip>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-wrap items-center">
            <SocketLabel className="mr-4">入力</SocketLabel>
            {model.sockets.input.map(({ id, label }) => (
              <SocketButton key={id} nodeId={nodeId} socketId={id}>
                {label}
              </SocketButton>
            ))}
            {model.sockets.input.length === 0 && (
              <div className="flex h-[22px] items-center text-xs font-bold text-slate-600">
                なし
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center mt-2">
            <SocketLabel className="mr-4">出力</SocketLabel>
            {model.sockets.output.map(({ id, label }) => (
              <SocketButton key={id} nodeId={nodeId} socketId={id}>
                {label}
              </SocketButton>
            ))}
            {model.sockets.output.length === 0 && (
              <div className="flex h-[22px] items-center text-xs font-bold text-slate-600">
                なし
              </div>
            )}
          </div>
        </div>
      </section>
      <Hr />

      {/* Layer */}
      <section>
        <Heading>レイヤー</Heading>
        <div className="flex items-center px-3 py-1 mt-2 border rounded w-max border-slate-200">
          <div className="text-xs">レイヤー1</div>
          <div aria-label="他のブロックに変更" className="p-1 ml-2">
            <FiChevronDown strokeWidth={1} />
          </div>
        </div>
      </section>
      <Hr />

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
        <Heading>アクション</Heading>
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

      {/* Description */}
      <section>
        <Heading>説明</Heading>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          入力と比較先が一致する場合にtrue、一致しない場合にfalseに移動します。
        </p>
      </section>
    </div>
  )
}

export default NodeDetailPane
