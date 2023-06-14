"use client"

import { useRouter } from "next/navigation"
import React, { useTransition } from "react"
import { FiPlus } from "react-icons/fi"
import classNames from "classnames"
import useSWRMutate from "swr/mutation"

import { createProgram } from "@/repo/createProgram"

export type CreateButtonProps = {
  className?: string
}

const CreateButton = ({ className }: CreateButtonProps) => {
  const router = useRouter()
  const { trigger: triggerCreateProgram, isMutating } = useSWRMutate(
    "create_program",
    () => createProgram(),
  )

  const [isPending, startTransition] = useTransition()

  const handleCreate = async () => {
    const id = await triggerCreateProgram()
    startTransition(() => {
      router.push(`/work/${id}/edit`)
    })
  }

  return (
    <button
      onClick={handleCreate}
      className={classNames(
        "flex items-center rounded-lg border-2 border-orange-400 px-4 py-2 text-sm font-bold text-orange-400 transition hover:bg-orange-50 active:translate-y-0.5",
        (isMutating || isPending) && "cursor-progress opacity-50",
        className,
      )}
    >
      <FiPlus className="inline" strokeWidth={4} />
      <span>新しいプログラムを作成</span>
    </button>
  )
}

export default CreateButton
