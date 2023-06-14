import { useEffect } from "react"

import { useBlockNodeOperation } from "@/beta/services/selector/blockNode"
import { isFucosableElement } from "@/utils/isFocusableElement"
import {
  useIsSelectedOperation,
  useSelectedNodeIds,
} from "@/beta/services/select/select"

const CaptureKeyboardEvent = () => {
  const selectedNodeIds = useSelectedNodeIds()
  const { addSelectAll } = useIsSelectedOperation()
  const { removeNode } = useBlockNodeOperation()

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (isFucosableElement(document.activeElement)) {
          return
        }
        for (const id of selectedNodeIds) {
          removeNode(id)
        }
      } else if (e.key === "a" && e.metaKey) {
        if (isFucosableElement(document.activeElement)) {
          return
        }
        addSelectAll()
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [addSelectAll, removeNode, selectedNodeIds])

  return null
}

export default CaptureKeyboardEvent
