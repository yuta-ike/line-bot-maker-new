import * as Accordion from "@radix-ui/react-accordion"
import classNames from "classnames"
import React, { forwardRef } from "react"
import { FiChevronDown } from "react-icons/fi"

export type FoldablePaneCardProps = {
  children: React.ReactNode
  title: string
  className?: string
  disabledOverflowHidden?: boolean
}

const FoldablePaneCard = forwardRef<HTMLDivElement, FoldablePaneCardProps>(
  function FoldablePaneCardInner(
    { children, title, className, disabledOverflowHidden = false },
    ref,
  ) {
    return (
      <Accordion.Root
        type="single"
        defaultValue="item-1"
        collapsible
        className={className}
      >
        <Accordion.Item
          value="item-1"
          className="group w-[260px] rounded-xl bg-white/90 shadow-popper"
        >
          <Accordion.Trigger className="group/title flex w-full items-center justify-between px-4 py-3 transition-[padding] group-data-open:py-4">
            <span>{title}</span>
            <div className="p-1 transition rounded-full group-hover/title:bg-slate-900/5 group-data-open:rotate-180">
              <FiChevronDown />
            </div>
          </Accordion.Trigger>
          <Accordion.Content
            className={classNames(
              "data-open:animate-switchOverflow data-closed:animate-switchOverflow data-open:animate-slideDown data-closed:animate-slideUp",
              disabledOverflowHidden ? "overflow-visible" : "overflow-hidden",
            )}
            ref={ref}
          >
            <div className="p-4 pt-0 space-y-4">{children}</div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
  },
)

export default FoldablePaneCard
