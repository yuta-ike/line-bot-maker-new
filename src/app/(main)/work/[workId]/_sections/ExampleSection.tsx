import React from "react"

import SectionCard from "@/beta/view/component/SectionCard"

export type InstructionSectionProps = {
  example: string
  className?: string
}

const InstructionSection = ({
  example,
  className,
}: InstructionSectionProps) => {
  return (
    <SectionCard className={className}>
      <h2 className="text-xl font-bold leading-none text-slate-600">Example</h2>
      <p className="mt-4 whitespace-pre-line text-slate-600">{example}</p>
      {example.length === 0 && <p className="text-slate-400">Not provided</p>}
    </SectionCard>
  )
}

export default InstructionSection
