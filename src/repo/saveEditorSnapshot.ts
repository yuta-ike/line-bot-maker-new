import { toast } from "react-toastify"

import { getAccount, getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

type SaveEditorSnapshotArgs = {
  id: string
  program: object
  debugState: object
}

export const saveEditorSnapshot = async ({
  id,
  program,
  debugState,
}: SaveEditorSnapshotArgs) => {
  const database = getDatabase()
  const account = getAccount()
  const user = await account.get()

  await database.updateDocument(DATABASE_ID, collections.programEditor, id, {
    program: JSON.stringify(program),
    debug_state: JSON.stringify(debugState),
    created_by: user.$id,
  })

  toast("保存しました", {})
}
