import { useRecoilCallback } from "recoil"

import { easeInOutCubic } from "@/utils/easing"
import { isOpenEmulatorState } from "@/beta/components/Ground/emulator"

import { blockNodeState } from "../selector/blockNode"
import { originState } from "../atoms/control"
import { useIsSelectedOperation } from "../select/select"

const STEP_COUNT = 16

export const useFocus = () => {
  const { putSelect } = useIsSelectedOperation()

  return useRecoilCallback(
    ({ snapshot, set }) =>
      (nodeId: string) => {
        const { node, rect } = snapshot
          .getLoadable(blockNodeState(nodeId))
          .getValue()
        const isOpenEmulator = snapshot
          .getLoadable(isOpenEmulatorState)
          .getValue()
        const origin = snapshot.getLoadable(originState).getValue()

        putSelect({ type: "node", id: node.id })

        const editorWidth = window.innerWidth - (isOpenEmulator ? 440 : 0)
        console.log()
        const editorHeight = window.innerHeight

        const delta = {
          x: -(rect.x + rect.width / 2 - editorWidth / 2),
          y: -(rect.y + 100 / 2 - editorHeight / 2) - 100,
        }

        const updater = (i: number) => {
          set(originState, {
            x: origin.x + Math.round(delta.x * easeInOutCubic(i / STEP_COUNT)),
            y: origin.y + Math.round(delta.y * easeInOutCubic(i / STEP_COUNT)),
          })
          if (STEP_COUNT <= i) {
            return
          }
          setTimeout(() => updater(i + 1), 15)
        }

        updater(1)
      },
    [putSelect],
  )
}
