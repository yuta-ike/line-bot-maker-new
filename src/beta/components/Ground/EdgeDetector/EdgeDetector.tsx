import React, { useCallback, useEffect, useRef } from "react"

import { useUpdateOrigin } from "@/beta/services/atoms/control"
import { usePointerPos } from "@/utils/pointerPos"
import { useIsDragging } from "@/beta/services/move/isDragging"

import { useMove } from "../../../services/move/groupMove"

export type EdgeDetectorProps = {
  className?: string
}

const EdgeDetector: React.FC<EdgeDetectorProps> = ({}) => {
  const isSomeElementSelected = useIsDragging()
  const pointerPos = usePointerPos()
  const move = useMove()
  const updateOrigin = useUpdateOrigin()

  const timerRef = useRef<NodeJS.Timer>()

  const handlePointerOver = useCallback(
    (dir: [1 | 0 | -1, 1 | 0 | -1]) => {
      const updater = (count: number) => {
        const delta = (1 - Math.pow(1 - Math.min(count / 10, 1), 2)) * 10
        updateOrigin(-dir[0] * delta, -dir[1] * delta)
        timerRef.current = setTimeout(() => updater(count + 1), 30)
        move({ deltaX: dir[0] * delta, deltaY: dir[1] * delta })
      }
      updater(1)
    },
    [move, updateOrigin],
  )

  const handlePointerLeave = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isSomeElementSelected) {
      handlePointerLeave()
      return
    }

    if (
      // upper right
      window.innerWidth - 100 < pointerPos.x &&
      pointerPos.y < 100
    ) {
      handlePointerOver([1, -1])
    } else if (
      // upper left
      pointerPos.x < 100 &&
      pointerPos.y < 100
    ) {
      handlePointerOver([-1, -1])
    } else if (
      // lower left
      pointerPos.x < 100 &&
      window.innerHeight - 100 < pointerPos.y
    ) {
      handlePointerOver([-1, 1])
    } else if (
      // lower right
      window.innerWidth - 100 < pointerPos.x &&
      window.innerHeight - 100 < pointerPos.y
    ) {
      handlePointerOver([1, 1])
    } else if (
      // right
      window.innerWidth - 100 <
      pointerPos.x
    ) {
      handlePointerOver([1, 0])
    } else if (
      // top
      pointerPos.y < 100
    ) {
      handlePointerOver([0, -1])
    } else if (
      // left
      pointerPos.x < 100
    ) {
      handlePointerOver([-1, 0])
    } else if (
      // bottom
      window.innerHeight - 100 <
      pointerPos.y
    ) {
      handlePointerOver([0, 1])
    } else {
      handlePointerLeave()
    }

    return () => handlePointerLeave()
  }, [
    handlePointerLeave,
    handlePointerOver,
    isSomeElementSelected,
    pointerPos.x,
    pointerPos.y,
  ])

  return null
}

export default EdgeDetector
