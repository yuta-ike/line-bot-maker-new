import React from "react"
import * as RaTooltip from "@radix-ui/react-tooltip"

export type TooltipProps = {
  children: React.ReactElement
  label: string
  side?: "top" | "right" | "bottom" | "left"
}

const Tooltip: React.FC<TooltipProps> = ({ children, label, side = "top" }) => {
  return (
    <RaTooltip.Provider>
      <RaTooltip.Root>
        <RaTooltip.Trigger asChild>{children}</RaTooltip.Trigger>
        <RaTooltip.Portal>
          <RaTooltip.Content
            sideOffset={5}
            side={side}
            className="px-3 py-2 text-xs leading-none text-white rounded bg-slate-500"
          >
            {label}
            <RaTooltip.Arrow className="fill-slate-500" />
          </RaTooltip.Content>
        </RaTooltip.Portal>
      </RaTooltip.Root>
    </RaTooltip.Provider>
  )
}

export default Tooltip
