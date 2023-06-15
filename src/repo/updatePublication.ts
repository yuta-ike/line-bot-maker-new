import { toast } from "react-toastify"

import { getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

type UpdatePublicationArgs = {
  id: string
  isPublic: boolean
}

export const updatePublication = async ({
  id,
  isPublic,
}: UpdatePublicationArgs) => {
  const database = getDatabase()

  await database.updateDocument(DATABASE_ID, collections.programEditor, id, {
    is_public: isPublic,
  })

  toast(isPublic ? "公開しました" : "非公開にしました", {})
}
