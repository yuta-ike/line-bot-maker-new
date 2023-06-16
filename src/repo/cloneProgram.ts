import { getAccount, getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { genId } from "@/utils/genId"

export const cloneProgram = async (id: string) => {
  const database = getDatabase()

  const doc = await database.getDocument(
    DATABASE_ID,
    collections.programEditor,
    id,
  )

  const account = getAccount()
  const user = await account.get()
  const newId = genId()

  await database.createDocument(DATABASE_ID, collections.programEditor, newId, {
    title: doc["title"],
    program: doc["program"],
    debug_state: doc["debug_state"],
    instruction: doc["instruction"],
    description: doc["description"],
    created_by: user.$id,
    created_by_name: user.name,
    is_public: false,
  })

  return newId
}
