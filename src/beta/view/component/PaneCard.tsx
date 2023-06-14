import classNames from "classnames"
import React, { forwardRef } from "react"

export type PaneCardProps = {
  children: React.ReactNode
  className?: string
}

const PaneCard = forwardRef<HTMLDivElement, PaneCardProps>(
  function PaneCardInner({ children, className }, ref) {
    return (
      <div
        className={classNames(
          "w-[260px] space-y-4 rounded-xl bg-white/90 p-4 shadow-popper",
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)

export default PaneCard
