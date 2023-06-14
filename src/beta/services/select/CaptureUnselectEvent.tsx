import React, { useEffect } from "react"

import { useIsAreaSelected } from "@/beta/components/Ground/SelectedAreaRect/selectArea"

import { useIsSelectedOperation } from "./select"

const CaptureUnselectEvent: React.FC = () => {
  const { clearSelect } = useIsSelectedOperation()
  const isAreaSelected = useIsAreaSelected()

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === "editor-ground" && !isAreaSelected) {
        clearSelect()
      }
    }
    window.addEventListener("pointerup", listener)
    return () => window.removeEventListener("pointerup", listener)
  }, [clearSelect, isAreaSelected])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearSelect()
      }
    }
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [clearSelect])

  return null
}

export default CaptureUnselectEvent
