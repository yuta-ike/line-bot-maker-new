import { toast } from "react-toastify"

import { getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

type SaveProgramTitleArgs = {
  id: string
  title: string
}

export const saveProgramTitle = async ({ id, title }: SaveProgramTitleArgs) => {
  const database = getDatabase()

  await database.updateDocument(DATABASE_ID, collections.programEditor, id, {
    title,
  })

  toast("保存しました", {})
}
