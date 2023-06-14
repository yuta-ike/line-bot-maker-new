import classNames from "classnames"
import React from "react"

export type PublicationStatusBadgeProps = {
  isPublic: boolean
  className?: string
}

const PublicationStatusBadge = ({
  isPublic,
  className,
}: PublicationStatusBadgeProps) => {
  return (
    <div
      className={classNames(
        "rounded-full border-2 bg-white/10 px-3 py-1 text-xs font-bold text-white",
        isPublic ? "border-white" : "border-transparent",
        className,
      )}
      style={{ textShadow: "0px 0px 2px rgb(0 0 0 / 0.2)" }}
    >
      {isPublic ? "公開中" : "下書き"}
    </div>
  )
}

export default PublicationStatusBadge
