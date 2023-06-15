import { getAccount, getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { genId } from "@/utils/genId"

export const createProgram = async () => {
  const database = getDatabase()
  const account = getAccount()
  const user = await account.get()
  const id = genId()

  await database.createDocument(DATABASE_ID, collections.programEditor, id, {
    title: "タイトルなし",
    program: `{"nodes":[],"edges":[]}`,
    debug_state: `{"simulatorInput":"","chatHistory":[]}`,
    created_by: user.$id,
    created_by_name: user.name,
    is_public: false,
    instruction: "",
    description: "",
  })

  return id
}
