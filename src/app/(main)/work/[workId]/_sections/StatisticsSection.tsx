import React from "react"
import classNames from "classnames"

import SectionCard from "@/beta/view/component/SectionCard"

export type StatisticsSectionProps = {
  className?: string
}

const StatisticsSection = ({ className }: StatisticsSectionProps) => {
  return (
    <SectionCard>
      <h2
        className={classNames(
          "text-xl font-bold leading-none text-slate-600",
          className,
        )}
      >
        統計情報
      </h2>
      <dl className="mt-6 w-[240px] shrink-0 rounded-xl border border-slate-200 p-2 text-sm text-slate-600">
        <div className="flex items-center justify-between p-2">
          <dt className="text-slate-500">使ってくれた人</dt>
          <dd>24人</dd>
        </div>
        <div className="flex items-center justify-between p-2">
          <dt className="text-slate-500">会話の数</dt>
          <dd>103回</dd>
        </div>
        <div className="flex items-center justify-between p-2">
          <dt className="text-slate-500">エラー率</dt>
          <dd>
            <div className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400" />
            0%
          </dd>
        </div>
      </dl>
    </SectionCard>
  )
}

export default StatisticsSection
