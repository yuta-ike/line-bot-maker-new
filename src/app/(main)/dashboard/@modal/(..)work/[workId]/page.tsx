"use client"

import React from "react"
import { useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"

import WorkDetailPage from "@/app/(main)/work/[workId]/page"

export type WorkDetailModalProps = {
  params: { workId: string }
}

const WorkDetailModal = ({ params }: WorkDetailModalProps) => {
  const router = useRouter()

  return (
    <Dialog.Root
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back()
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 shadow data-open:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90%] w-container max-w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-lg bg-white data-open:animate-contentShow">
          <WorkDetailPage params={params} />
          {/* <Dialog.Title />
          <Dialog.Description /> */}
          <Dialog.Close asChild>
            <button className="sr-only">
              <div className="sr-only">とじる</div>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default WorkDetailModal
