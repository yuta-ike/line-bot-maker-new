"use client"

import useSWR from "swr"
import classNames from "classnames"
import { FiCompass } from "react-icons/fi"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { listPrograms } from "@/repo/listPrograms"
import { range } from "@/utils/range"

import WorkCard, { WorkCardSkelton } from "./WorkCard"
import { TabId } from "./DashboardTab"

export type WorkCardListProps = {
  className?: string
}

const WorkCardList = ({ className }: WorkCardListProps) => {
  const searchParams = useSearchParams()
  const selected = (searchParams.get("filter") as TabId) ?? "all"

  const { data: programs, isLoading } = useSWR("list_programs", () =>
    listPrograms(),
  )

  const filteredPrograms = useMemo(() => {
    if (selected === "all") {
      return programs
    }
    return programs?.filter(
      (program) =>
        (selected === "public" && program.isPublic) ||
        (selected === "draft" && !program.isPublic),
    )
  }, [programs, selected])

  if (!isLoading && filteredPrograms?.length === 0) {
    return (
      <div className="flex w-full flex-col items-center space-y-8 p-8">
        <div className="text-slate-400">
          <FiCompass size={64} />
        </div>
        <div className="text-slate-600">No program posted yet.</div>
      </div>
    )
  }

  return (
    <div
      className={classNames("grid w-full gap-8", className)}
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      {isLoading &&
        range(10).map((_, i) => <WorkCardSkelton key={i} className="w-full" />)}

      {filteredPrograms?.map((program, i) => (
        <WorkCard key={i} program={program} className="w-full" />
      ))}
    </div>
  )
}

export default WorkCardList
