"use client"

import React from "react"
import useSWR from "swr"

import SectionCard from "@/beta/view/component/SectionCard"
import { listPublicPrograms } from "@/repo/listPublicPrograms"
import { range } from "@/utils/range"

import WorkCard, { WorkCardSkelton } from "./_component/WorkCard"

const ExplorePage = () => {
  const { data: programs, isLoading } = useSWR("listPublicPrograms", () =>
    listPublicPrograms(),
  )

  return (
    <div className="mx-auto w-container max-w-full p-8">
      <SectionCard className="!p-0">
        <div className="">
          <h2 className="p-8 text-2xl font-bold text-slate-600">
            Explore Community
          </h2>
        </div>
        <hr className="w-full" />
        <div className="p-8">
          <div
            className="grid w-full gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            }}
          >
            {isLoading && range(10).map((i) => <WorkCardSkelton key={i} />)}
            {programs?.map((program) => (
              <WorkCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

export default ExplorePage
