"use client"

import React, { useTransition } from "react"
import * as Form from "@radix-ui/react-form"
import TextareaAutosize from "react-textarea-autosize"
import { useRouter } from "next/navigation"
import useSWRMutate from "swr/mutation"

import SectionCard from "@/beta/view/component/SectionCard"
import { createProgram } from "@/repo/createProgram"
import Overlay from "@/components/Overlay"

const NewProgramPage = () => {
  const router = useRouter()
  const { trigger: triggerCreateProgram, isMutating } = useSWRMutate(
    "create_program",
    (_, { arg }: { arg: { title: string; description: string } }) =>
      createProgram(arg),
  )

  const [isPending, startTransition] = useTransition()

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: any = Object.fromEntries(new FormData(e.currentTarget))

    const id = await triggerCreateProgram(data)

    startTransition(() => {
      router.push(`/work/${id}/edit`)
    })
  }

  return (
    <div className="mx-auto w-[600px] max-w-full px-8 pt-12">
      <SectionCard className="relative overflow-hidden">
        <h1 className="text-xl font-bold text-slate-600">New Bot Program</h1>
        <Form.Root className="mt-8 space-y-8" onSubmit={handleCreate}>
          <Form.Field name="title">
            <Form.Label className="text-sm font-bold text-slate-600">
              Name
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="My First Bot Program"
                disabled={isMutating || isPending}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="description">
            <Form.Label className="text-sm font-bold text-slate-600">
              Description
            </Form.Label>
            <Form.Control asChild>
              <TextareaAutosize
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="Description"
                minRows={3}
                disabled={isMutating || isPending}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button
              disabled={isMutating || isPending}
              className="flex w-full items-center justify-center space-x-2 rounded bg-orange-400 px-4 py-2 font-bold text-white transition hover:bg-orange-500 hover:shadow active:translate-y-0.5 active:shadow-none disabled:opacity-50"
            >
              Create
            </button>
          </Form.Submit>
        </Form.Root>
      </SectionCard>
      <Overlay show={isMutating || isPending} />
    </div>
  )
}

export default NewProgramPage
