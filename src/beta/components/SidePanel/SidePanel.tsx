import React, { useEffect, useRef, useState } from "react"
import * as Tabs from "@radix-ui/react-tabs"
import { throttle } from "throttle-debounce"
import { FiChevronsRight } from "react-icons/fi"

import Tooltip from "@/beta/view/atoms/Tooltop"

import { useIsOpenEmulator, useSetIsOpenEmulator } from "../Ground/emulator"

import Emulator from "./Emulator/Emulator"
import Testcase from "./Testcase/Testcase"
import Debug from "./Debug/Debug"

const TABS = [
  {
    id: "emulator" as const,
    label: "Emulator",
  },
  {
    id: "debug" as const,
    label: "Debug",
  },
  {
    id: "testcase" as const,
    label: "Test cases",
  },
] as const

type Tab = (typeof TABS)[number]["id"]

const SidePanel = () => {
  const [tab, setTab] = useState<Tab>("emulator")
  const panelRef = useRef<HTMLDivElement | null>(null)
  const resizeHandlerRef = useRef<HTMLDivElement | null>(null)

  const [isOpenEmulator] = useIsOpenEmulator()
  const setIsOpenEmulator = useSetIsOpenEmulator()

  useEffect(() => {
    const resizeHandlerElm = resizeHandlerRef.current
    if (resizeHandlerElm == null) {
      return
    }

    const dragStartListener = (e: DragEvent) => {
      e.dataTransfer!.effectAllowed = "move"
      e.dataTransfer?.setDragImage(resizeHandlerElm, 0, 0)
      resizeHandlerElm.style.opacity = "0"
    }

    const dragListener = throttle(30, (e: DragEvent) => {
      const panelElm = panelRef.current
      if (panelElm == null) {
        return
      }
      if (e.clientX === 0) {
        return
      }
      panelElm.style.width = `${window.innerWidth - e.clientX}px`
    })

    resizeHandlerElm.addEventListener("dragstart", dragStartListener)
    resizeHandlerElm.addEventListener("drag", dragListener)
    return () => {
      resizeHandlerElm.removeEventListener("dragstart", dragStartListener)
      resizeHandlerElm.removeEventListener("drag", dragListener)
    }
  }, [])

  useEffect(() => {
    console.log("MOUNT")

    return () => console.log("UNMOUNT")
  }, [])

  if (!isOpenEmulator) {
    return null
  }

  return (
    <>
      <Tabs.Root
        value={tab}
        onValueChange={(value) => setTab(value as Tab)}
        className="fixed bottom-0 right-0 top-[60px] flex w-[440px] flex-col border-l border-slate-200 bg-white"
        ref={panelRef}
      >
        <Tabs.List className="group flex w-full min-w-0 max-w-full shrink-0 items-center overflow-x-scroll border-b border-slate-200 bg-white p-2">
          <Tooltip label="とじる">
            <button
              className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="サイドパネルを閉じる"
              onClick={() => setIsOpenEmulator(false)}
            >
              <FiChevronsRight />
            </button>
          </Tooltip>
          {TABS.map(({ id, label }) => (
            <Tabs.Trigger
              key={id}
              value={id}
              className="rounded px-4 py-1 text-sm font-bold text-slate-400 transition hover:text-slate-600 focus-visible:bg-slate-50 data-active:text-slate-600"
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={TABS[0].id} className="min-h-0 grow">
          <Emulator className="h-full" />
        </Tabs.Content>
        <Tabs.Content value={TABS[1].id}>
          <Debug />
        </Tabs.Content>
        <Tabs.Content value={TABS[2].id}>
          <Testcase />
        </Tabs.Content>
        {/* Resize handler */}
        <div
          ref={resizeHandlerRef}
          draggable
          className="peer absolute inset-y-0 left-0 grid w-2 -translate-x-1/2 cursor-grab place-items-center"
        />
        <div className="pointer-events-none absolute inset-y-32 left-0 grid w-2 -translate-x-1/2 cursor-grab place-items-center rounded-full bg-slate-700/50 opacity-0 transition peer-hover:opacity-100">
          <div className="h-14 w-1 rounded-full bg-white" />
        </div>
      </Tabs.Root>
    </>
  )
}

export default SidePanel
