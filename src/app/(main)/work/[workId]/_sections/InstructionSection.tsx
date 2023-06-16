import React from "react"

import SectionCard from "@/beta/view/component/SectionCard"

export type InstructionSectionProps = {
  instruction: string
  className?: string
}

const InstructionSection = ({
  instruction,
  className,
}: InstructionSectionProps) => {
  return (
    <SectionCard className={className}>
      <h2 className="text-xl font-bold leading-none text-slate-600">
        How to use
      </h2>
      <p className="mt-4 whitespace-pre-line text-slate-600">{instruction}</p>
      {instruction.length === 0 && (
        <p className="text-slate-400">Not provided</p>
      )}
    </SectionCard>
  )
}

export default InstructionSection
