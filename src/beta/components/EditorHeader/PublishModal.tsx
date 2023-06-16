import * as Dialog from "@radix-ui/react-dialog"
import * as Form from "@radix-ui/react-form"
import React from "react"
import TextareaAutosize from "react-textarea-autosize"
import { useSWRConfig } from "swr"

import Overlay from "@/components/Overlay"

import { useUpdatePublication } from "./useUpdatePublication"

export type PublishModalProps = {
  workId: string
  initInstruction: string
  initExample: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean, result?: boolean) => void
}

const PublishModal = ({
  workId,
  initInstruction,
  initExample,
  isOpen,
  onOpenChange,
}: PublishModalProps) => {
  const { mutate } = useSWRConfig()
  const { trigger: updatePublication, isMutating } =
    useUpdatePublication(workId)

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: any = Object.fromEntries(new FormData(e.currentTarget))

    await updatePublication({
      isPublic: true,
      instruction: data.instruction,
      example: data.example,
    })

    mutate([workId, "fetch_program_details"])

    // TODO
    onOpenChange(false, true)
  }

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 shadow data-open:animate-overlayShow" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90%] w-[600px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-lg bg-white data-open:animate-contentShow">
            <div className="p-8">
              <Dialog.Title className="text-2xl font-bold text-slate-600">
                Publish
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-slate-500">
                Provide clear information and make it user-friendly for
                everyone.
              </Dialog.Description>
              <Form.Root className="mt-6 space-y-4" onSubmit={handlePublish}>
                <Form.Field name="instruction">
                  <Form.Label className="font-bold text-slate-600">
                    Instruction
                  </Form.Label>
                  <Form.Control asChild>
                    <TextareaAutosize
                      defaultValue={initInstruction}
                      disabled={isMutating}
                      minRows={3}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                      placeholder="How to use your bot?"
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field name="example">
                  <Form.Label className="text-sm font-bold text-slate-600">
                    Example Conversation
                  </Form.Label>
                  <Form.Control asChild>
                    <TextareaAutosize
                      defaultValue={initExample}
                      disabled={isMutating}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                      placeholder="Conversation"
                      minRows={3}
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Submit
                  disabled={isMutating}
                  className="flex w-full items-center justify-center space-x-2 rounded bg-orange-400 px-4 py-2 font-bold text-white transition hover:bg-orange-500 hover:shadow active:translate-y-0.5 active:shadow-none disabled:opacity-50"
                >
                  Publish
                </Form.Submit>
              </Form.Root>
            </div>
            {/* <Dialog.Title />
          <Dialog.Description /> */}
            <Dialog.Close asChild>
              <button className="sr-only">
                <div className="sr-only">Close</div>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Overlay show={isMutating} />
    </>
  )
}

export default PublishModal
