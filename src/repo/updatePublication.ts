import { toast } from "react-toastify"

import { getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

type UpdatePublicationArgs = {
  id: string
  isPublic: boolean
  instruction?: string
  example?: string
}

export const updatePublication = async ({
  id,
  isPublic,
  instruction,
  example,
}: UpdatePublicationArgs) => {
  const database = getDatabase()

  await database.updateDocument(DATABASE_ID, collections.programEditor, id, {
    is_public: isPublic,
    instruction,
    example,
  })

  toast(isPublic ? "I have made it public" : "I have made it private", {})
}
