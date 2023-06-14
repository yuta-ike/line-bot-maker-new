import { useRecoilValue } from "recoil"
import useSWRMutation from "swr/mutation"

import { saveEditorSnapshot } from "@/repo/saveEditorSnapshot"
import { snapshotState } from "@/beta/services/serialization/serialization"

export const useSaveEditorSnapshot = (id: string) => {
  const snapshot = useRecoilValue(snapshotState)

  const res = useSWRMutation("save_editor_snapshot", () =>
    saveEditorSnapshot({ id, ...snapshot }),
  )

  return res
}
