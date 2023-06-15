import React from "react"
import { FiChevronDown, FiPlay, FiRadio } from "react-icons/fi"
import classNames from "classnames"
import { IconType } from "react-icons"

import { useRunInterpreter } from "@/beta/interpreter/hook"
import Dropdown from "@/beta/view/atoms/Dropdown"
import { RunMode, useRunMode } from "@/beta/interpreter/runMode"

const DEBUG_OPTIONS: { id: RunMode; label: string; icon?: IconType }[] = [
  { id: "realtime" as const, label: "Realtime", icon: FiRadio },
  { id: "ondemand" as const, label: "Run on click", icon: FiPlay },
]

export type RunButtonProps = {
  className?: string
}

const RunButton: React.FC<RunButtonProps> = ({ className }) => {
  // Interpreter
  const { runInterpreter } = useRunInterpreter()

  const [runMode, setRunMode] = useRunMode()

  return (
    <div
      className={classNames(
        "flex items-stretch text-sm font-bold text-white hover:shadow active:shadow-none",
        className,
      )}
    >
      <button
        className={classNames(
          "flex grow items-center justify-center rounded-l border-2 px-2 py-2 transition active:translate-y-px",
          runMode === "realtime"
            ? "border-orange-400 text-orange-400 hover:border-orange-500 disabled:hover:border-orange-400"
            : "border-transparent bg-orange-400 text-white hover:bg-orange-500",
        )}
        disabled={runMode === "realtime"}
        onClick={() => runInterpreter("debugger")}
      >
        {runMode === "realtime" ? (
          <>
            <FiRadio className="mr-2" />
            <span>Running...</span>
          </>
        ) : (
          <>
            <FiPlay strokeWidth={3} />
            <span>Run</span>
          </>
        )}
      </button>
      <Dropdown<RunMode> items={DEBUG_OPTIONS} onClick={setRunMode}>
        <button
          className={classNames(
            "shrink-0 rounded-r border-white/40  bg-orange-400 p-3 hover:bg-orange-500 focus:outline-none active:translate-y-px data-open:bg-orange-500",
            runMode === "realtime" ? "border-l-0" : "border-l",
          )}
        >
          <FiChevronDown strokeWidth={3} />
        </button>
      </Dropdown>
    </div>
  )
}

export default RunButton
