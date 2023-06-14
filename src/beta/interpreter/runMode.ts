import { atom, useRecoilState } from "recoil"

export type RunMode = "realtime" | "ondemand"

export const runModeState = atom<RunMode>({
  key: "atom/runMode",
  default: "realtime",
})

export const useRunMode = () => useRecoilState(runModeState)
