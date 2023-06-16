"use client"

import Link from "next/link"
import React from "react"
import { FiCopy, FiEdit3, FiFlag, FiHeart, FiShare } from "react-icons/fi"
import useSWR from "swr"
import useSWRMutate from "swr/mutation"
import { useRouter } from "next/navigation"

import { getProgram } from "@/repo/getProgram"
import TextWithSkelton from "@/components/TextWithSkelton"
import { useUser } from "@/lib/appwrite/auth"
import { cloneProgram } from "@/repo/cloneProgram"
import Overlay from "@/components/Overlay"

import CreatorChip, { CreatorChipSkelton } from "./_component/CreatorChip"
import MetaDataTable from "./_component/MetaDataTable"
import InstructionSection from "./_sections/InstructionSection"
import ExampleSection from "./_sections/ExampleSection"

export type WorkDetailPageProps = {
  params: {
    workId: string
  }
}

const WorkDetailPage = ({ params: { workId } }: WorkDetailPageProps) => {
  const router = useRouter()
  const { data: user } = useUser()
  const { data: program } = useSWR([workId, "fetch_program"], ([workId]) =>
    getProgram(workId),
  )

  const { trigger: triggerClone, isMutating } = useSWRMutate(
    [workId, "clone_program"],
    ([workId]) => cloneProgram(workId),
  )

  const handleClone = async () => {
    const id = await triggerClone()
    router.push(`/work/${id}/edit`)
  }

  return (
    <>
      <div className="bg-slate-50">
        <div className="relative w-full border-b border-slate-200 bg-white pb-20 pt-8">
          <div className="mx-auto w-container max-w-full px-8">
            <div className="flex items-center text-2xl font-bold text-slate-600">
              <TextWithSkelton as="h2" className="mr-4 min-w-[100px]">
                {program?.title}
              </TextWithSkelton>

              {program?.isPublic === true && (
                <div className="flex shrink-0 items-center space-x-2 rounded bg-orange-500 px-2 py-0.5 text-sm font-bold text-white">
                  <div>Public</div>
                </div>
              )}
              <div className="ml-auto flex shrink-0 items-center space-x-4">
                {user != null &&
                program != null &&
                user.$id !== program.createdBy.id ? (
                  <>
                    <button
                      onClick={handleClone}
                      className="flex items-center space-x-2 rounded-lg border border-slate-200 px-8 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-400 active:translate-y-0.5"
                    >
                      <FiCopy />
                      <div>Clone</div>
                    </button>
                    <Link
                      href={`/chat/${workId}`}
                      className="border-orage-400 flex items-center space-x-2 rounded-lg border border-orange-400 bg-orange-400 px-8 py-3 text-sm font-bold text-white transition hover:border-orange-500 hover:bg-orange-500 active:translate-y-0.5"
                    >
                      <div>Try</div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/chat/${workId}`}
                      className="flex items-center space-x-2 rounded-lg border border-slate-200 px-8 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-400 active:translate-y-0.5"
                    >
                      <div>Try</div>
                    </Link>
                    <Link
                      href={`/work/${workId}/edit`}
                      className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-700 px-12 py-3 text-sm font-bold text-white transition hover:border-slate-600 hover:bg-slate-600 hover:shadow-lg active:translate-y-0.5 active:shadow-none"
                    >
                      <FiEdit3 />
                      <div>Edit</div>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 flex">
              <div className="mr-10 grow">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <TextWithSkelton>{program?.description}</TextWithSkelton>
                  <hr className="mt-4" />
                  <h2 className="mt-4 text-sm font-bold text-slate-500">
                    Creator
                  </h2>
                  <div className="mt-2 flex items-center space-x-2">
                    {program == null ? (
                      <CreatorChipSkelton />
                    ) : (
                      [program.createdBy.name].map((name) => (
                        <CreatorChip key={name} name={name} />
                      ))
                    )}
                  </div>
                </div>
              </div>
              <MetaDataTable
                program={program ?? null}
                className="w-[240px] shrink-0"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 flex w-max -translate-x-1/2 translate-y-4 items-center space-x-4 rounded-full border border-slate-200 bg-white p-2 shadow-section-card">
            <button className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-500">
              <FiHeart size={18} />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-500">
              <FiShare size={18} />
            </button>
            <button className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-500">
              <FiFlag size={18} />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-container max-w-full flex-col items-center gap-y-8 px-8 pb-8">
          {/* <StatisticsSection /> */}
          <InstructionSection instruction={program?.instruction ?? ""} />
          <ExampleSection example={program?.example ?? ""} />
        </div>
      </div>
      <Overlay show={isMutating} />
    </>
  )
}

export default WorkDetailPage
