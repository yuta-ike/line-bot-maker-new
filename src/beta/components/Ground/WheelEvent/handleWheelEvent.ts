import { useEffect, useRef } from "react"

import { useUpdateOrigin } from "@/beta/services/atoms/control"

export const useHandleWheelEvent = () => {
  const updateOrigin = useUpdateOrigin()

  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const elm = ref.current
    if (elm == null) {
      return
    }
    const listener = (e: WheelEvent) => {
      e.preventDefault()
      updateOrigin(-e.deltaX, -e.deltaY)
    }
    elm.addEventListener("wheel", listener, { passive: false })
    return () => elm.removeEventListener("wheel", listener)
  }, [updateOrigin])

  return ref
}
