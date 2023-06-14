import React from "react"
import classNames from "classnames"

import FoldablePaneCard from "@/beta/view/component/FoldablePaneCard"
import ExecSection from "@/beta/view/component/ExecSection/ExecSection"

export type ExecPaneProps = {
  className?: string
}

const ExecPane: React.FC<ExecPaneProps> = ({ className }) => {
  return (
    <FoldablePaneCard title="デバッグ" className={classNames("", className)}>
      <ExecSection />
    </FoldablePaneCard>
  )
}

export default ExecPane
