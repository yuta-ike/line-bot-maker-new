import React from "react"
import * as RaPopover from "@radix-ui/react-popover"
import { FiX } from "react-icons/fi"

import { ALIGNS } from "@/beta/services/align/align"

import Tooltip from "./Tooltop"

export type PopoverProps = {
  children: React.ReactNode
  onAlign: (
    align: "top" | "bottom" | "left" | "right" | "v-center" | "h-center",
  ) => void
}

const AlignPopover: React.FC<PopoverProps> = ({ children, onAlign }) => (
  <RaPopover.Root>
    <RaPopover.Trigger asChild>{children}</RaPopover.Trigger>
    <RaPopover.Portal>
      <RaPopover.Content sideOffset={4} side="bottom">
        <div className="flex items-center px-2 py-1 space-x-2 bg-white rounded-full shadow-popper">
          {ALIGNS.map(({ id, label, Icon }) => (
            <Tooltip label={id} key={label}>
              <button
                className="relative rounded p-1.5 transition hover:bg-gray-400/20"
                aria-label={label}
                onClick={() => onAlign(id)}
              >
                <Icon />
              </button>
            </Tooltip>
          ))}
          <div className="h-[20px] w-[1px] bg-slate-200" />
          <Tooltip label="閉じる">
            <RaPopover.Close aria-label="Close" asChild>
              <button
                className="relative rounded p-1.5 transition hover:bg-gray-400/20"
                aria-label="閉じる"
              >
                <FiX />
              </button>
            </RaPopover.Close>
          </Tooltip>
        </div>
      </RaPopover.Content>
    </RaPopover.Portal>
  </RaPopover.Root>
)

export default AlignPopover
