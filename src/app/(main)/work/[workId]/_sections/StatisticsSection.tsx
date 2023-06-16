import React from "react"
import classNames from "classnames"
import useSWR from "swr"

import SectionCard from "@/beta/view/component/SectionCard"
import { getStatistics } from "@/repo/getStatistics"
import TextWithSkelton from "@/components/TextWithSkelton"

export type StatisticsSectionProps = {
  workId: string
  className?: string
}

const StatisticsSection = ({ workId, className }: StatisticsSectionProps) => {
  const { data: statistics } = useSWR(
    [workId, "fetch_statistics"],
    ([workId]) => getStatistics(workId),
  )

  const successRate =
    statistics == null
      ? null
      : Math.round(
          (statistics.summary.success / statistics.summary.total) * 100,
        )

  return (
    <SectionCard>
      <h2
        className={classNames(
          "text-xl font-bold leading-none text-slate-600",
          className,
        )}
      >
        Statistics
      </h2>
      <dl className="mt-6 w-[240px] shrink-0 rounded-xl border border-slate-200 p-2 text-sm text-slate-600">
        {/* <div className="flex items-center justify-between p-2">
          <dt className="text-slate-500">使ってくれた人</dt>
          <dd>24人</dd>
        </div> */}
        <div className="flex items-center justify-between p-2">
          <dt className="text-slate-500">Conversations</dt>
          <TextWithSkelton as="dd" skeltonWidth={40}>
            {statistics?.summary.total.toString() ?? null}
          </TextWithSkelton>
        </div>
        {statistics?.summary.total !== 0 && (
          <div className="flex items-center justify-between p-2">
            <dt className="text-slate-500">Success rate</dt>
            <dd className="flex items-center">
              {successRate != null && (
                <div
                  className={classNames(
                    "mr-2 inline-block h-2 w-2 rounded-full",
                    successRate < 0.5
                      ? "bg-red-400"
                      : successRate < 0.95
                      ? "bg-orange-400"
                      : "bg-green-400",
                  )}
                />
              )}
              <TextWithSkelton skeltonWidth={40}>
                {successRate == null ? null : `${successRate}%`}
              </TextWithSkelton>
            </dd>
          </div>
        )}
      </dl>
    </SectionCard>
  )
}

export default StatisticsSection
