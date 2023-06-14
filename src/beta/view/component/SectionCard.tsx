import classNames from "classnames"
import React from "react"

export type SectionCardProps = {
  children: React.ReactNode
  className?: string
}

const SectionCard: React.FC<SectionCardProps> = ({ children, className }) => {
  return (
    <section
      className={classNames(
        "w-full rounded-xl border border-slate-200 bg-white p-8 shadow-section-card",
        className,
      )}
    >
      {children}
    </section>
  )
}

export default SectionCard
