import React from "react"

import SectionCard from "@/beta/view/component/SectionCard"

export type InstructionSectionProps = {
  className?: string
}

const InstructionSection = ({ className }: InstructionSectionProps) => {
  return (
    <SectionCard className={className}>
      <h2 className="text-xl font-bold leading-none text-slate-600">Example</h2>
      <p className="mt-4 text-slate-600">
        1. 天気予報を知りたい時は、「天気を教えて」と送ってください。
        <br />
        2. 次に、場所を聞かれるので、場所を答えてください。
        <br />
        3. すると、天気予報が表示されます。
      </p>
    </SectionCard>
  )
}

export default InstructionSection
