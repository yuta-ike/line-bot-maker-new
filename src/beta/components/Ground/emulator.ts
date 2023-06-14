import { atom, useRecoilState, useSetRecoilState } from "recoil"

export const isOpenEmulatorState = atom({
  key: "atom/isOpenEmulator",
  default: false,
})

export const useIsOpenEmulator = () => useRecoilState(isOpenEmulatorState)
export const useSetIsOpenEmulator = () => useSetRecoilState(isOpenEmulatorState)
