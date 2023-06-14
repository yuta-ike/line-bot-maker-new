import React from "react"
import { FiChevronsLeft } from "react-icons/fi"

import Tooltip from "@/beta/view/atoms/Tooltop"

import { useIsOpenEmulator } from "../../Ground/emulator"

const SidePanelButton: React.FC = () => {
  // Emulator
  const [isOpenEmulator, setIsOpenEmulator] = useIsOpenEmulator()

  if (isOpenEmulator) {
    return null
  }

  return (
    <Tooltip label="サイドパネル">
      <button
        onClick={() => setIsOpenEmulator(true)}
        aria-label="サイドパネルを開く"
      >
        <div className="w-max translate-x-8 rounded-l-xl bg-white/90 p-4 pr-8 text-slate-600 shadow-popper transition hover:translate-x-4 hover:bg-slate-50">
          <FiChevronsLeft size={18} />
        </div>
      </button>
    </Tooltip>
  )
}

export default SidePanelButton
