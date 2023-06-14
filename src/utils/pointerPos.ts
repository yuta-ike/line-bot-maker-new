import { useEffect, useRef } from "react"
import { atom, useRecoilValue, useSetRecoilState } from "recoil"
import { throttle } from "throttle-debounce"

export const pointerPosState = atom({
  key: "atom/pointerPos",
  default: { x: 0, y: 0 },
})

export const useSetPointerPos = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const setPointerPos = useSetRecoilState(pointerPosState)

  useEffect(() => {
    const elm = ref.current
    if (elm == null) return

    const listener = throttle(30, (e: PointerEvent) => {
      setPointerPos({
        x: e.clientX,
        y: e.clientY,
      })
    })

    document.addEventListener("pointermove", listener)
    return () => document.removeEventListener("pointermove", listener)
  }, [setPointerPos])

  return ref
}

const INIT = { x: 0, y: 0 }

export const usePointerPos = () => useRecoilValue(pointerPosState)
