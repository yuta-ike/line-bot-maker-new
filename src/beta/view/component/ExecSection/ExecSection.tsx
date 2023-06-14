import React from "react"
import { FiArrowDown, FiCrosshair } from "react-icons/fi"
import classNames from "classnames"

import { useFocus } from "@/beta/services/focus/focus"
import Tooltip from "@/beta/view/atoms/Tooltop"
import {
  useAutomaticRunInterpreter,
  useRunInterpreter,
  useSimulateInput,
} from "@/beta/interpreter/hook"
import { useRunMode } from "@/beta/interpreter/runMode"

import RunButton from "./RunButton"
import { useMockableNodeIds } from "./useMockFields"
import MockField from "./MockField"

export type ExecPaneProps = {
  className?: string
}

const ExecSection: React.FC<ExecPaneProps> = ({ className }) => {
  // Run mode
  const [runMode] = useRunMode()

  // Interpreter
  const realtimeData = useAutomaticRunInterpreter()
  const { data: ondemandData } = useRunInterpreter()

  const data = runMode === "realtime" ? realtimeData : ondemandData

  // Mockable Node ids
  const mockableNodeIds = useMockableNodeIds()

  // Simulator input
  const [value, setValue] = useSimulateInput()

  // focus
  const focus = useFocus()

  return (
    <div className={classNames("space-y-4", className)}>
      {/* Run button */}
      <RunButton className="w-full" />
      {/* Input Field */}
      <textarea
        className="w-full resize-none rounded border border-slate-200 p-2 text-sm focus:outline-none"
        value={value}
        rows={3}
        onChange={(e) => setValue(e.target.value)}
        placeholder="入力"
      />
      <div className="flex flex-col gap-y-4">
        <div className="text-sm text-slate-600">モックの設定</div>
        {mockableNodeIds.map((id) => {
          return <MockField key={id} id={id} />
        })}
      </div>
      <hr className="w-[calc(100%+32px)] -translate-x-4" />
      <section>
        <h3 className="text-sm">実行結果</h3>
        <div
          className={classNames(
            "mt-2 min-h-[3lh] w-full resize-none rounded border p-2 text-sm focus:outline-none",
            data?.result.type === "failure"
              ? "border-red-600 bg-red-50 text-red-600"
              : "border-slate-200 bg-slate-50",
          )}
        >
          {data == null ? null : data.result.type === "success" ? (
            data.result.data.length === 0 ? (
              <span className="text-slate-400">{`< 空白 >`}</span>
            ) : (
              data.result.data
            )
          ) : (
            data.result.error.message
          )}
        </div>
      </section>
      {data != null && 0 < data.stacktrace.length && (
        <section>
          <h3 className="mb-2 text-sm">スタックトレース</h3>
          <ol className="flex w-full flex-col">
            {data?.stacktrace.map((item, i) => (
              <li
                key={`${i}:${item.nodeId}`}
                className="w-[calc(100%+32px)] -translate-x-4"
              >
                <div
                  className={classNames(
                    "w-full border-y px-4 py-2 text-start text-sm",
                    item.type === "failure"
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-transparent bg-slate-50 text-slate-600",
                  )}
                >
                  <div className="flex w-full items-center justify-between text-slate-600">
                    {i + 1}. {item.node.model.meta.name}
                    <Tooltip label="フォーカスする">
                      <button
                        onClick={() => focus(item.node.id)}
                        aria-label="フォーカスする"
                      >
                        <FiCrosshair className="text-slate-400 transition hover:text-slate-600 active:translate-y-[1px]" />
                      </button>
                    </Tooltip>
                  </div>
                  {item.type === "failure" && (
                    <>
                      <hr className="my-2 w-[calc(100%+16px)] -translate-x-2 border-red-600/20" />
                      <p>{item.error.message}</p>
                    </>
                  )}
                </div>
                {item.type === "next" && (
                  <div className="my-2 flex items-center justify-start space-x-2 px-4">
                    <FiArrowDown className="shrink-0 text-slate-600" />
                    {0 < item.value.length && (
                      <div className="rounded bg-slate-400 px-2 py-1 text-xs text-white">
                        <div className="mr-2 inline border-r border-slate-300 pr-2 font-bold">
                          {item.socketId}
                        </div>
                        <div className="inline">{item.value}</div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}

export default ExecSection
