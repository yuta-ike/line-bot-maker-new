import { useCallback, useMemo } from "react"
import { atom, useRecoilState, useSetRecoilState } from "recoil"

export const originState = atom({
  key: "origin",
  default: {
    x: 0,
    y: 0,
  },
})

export const useUpdateOrigin = () => {
  const setOrigin = useSetRecoilState(originState)

  const updateOrigin = useCallback(
    (deltaX: number, deltaY: number) => {
      setOrigin((origin) => ({
        x: origin.x + deltaX,
        y: origin.y + deltaY,
      }))
    },
    [setOrigin],
  )

  return updateOrigin
}

export const useUpdateOriginDirectional = () => {
  const setOrigin = useSetRecoilState(originState)

  const updateHoritontal = useCallback(
    (deltaX: number) => {
      setOrigin((origin) => ({ ...origin, x: origin.x + deltaX }))
    },
    [setOrigin],
  )

  const updateVertical = useCallback(
    (deltaY: number) => {
      setOrigin((origin) => ({ ...origin, y: origin.y + deltaY }))
    },
    [setOrigin],
  )

  return useMemo(
    () => ({ updateHoritontal, updateVertical }),
    [updateHoritontal, updateVertical],
  )
}

export const zoomState = atom({
  key: "zoom",
  default: 1,
})

export const useUpdateZoom = () => {
  const [zoom, setZoom] = useRecoilState(zoomState)

  const updateZoom = useCallback(
    (deltaZoom: number) => {
      setZoom((zoom) => zoom + deltaZoom)
    },
    [setZoom],
  )

  return [zoom, updateZoom] as const
}
