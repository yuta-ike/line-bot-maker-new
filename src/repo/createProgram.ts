import { getAccount, getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { genId } from "@/utils/genId"

export type CreateProgramArg = {
  title: string
  description: string
}

export const createProgram = async ({
  title,
  description,
}: CreateProgramArg) => {
  const database = getDatabase()
  const account = getAccount()
  const user = await account.get()
  const id = genId()

  await database.createDocument(DATABASE_ID, collections.programEditor, id, {
    title,
    program: `{"nodes":[],"edges":[]}`,
    debug_state: `{"simulatorInput":"","chatHistory":[]}`,
    created_by: user.$id,
    created_by_name: user.name,
    is_public: false,
    instruction: "",
    example: "",
    description,
  })

  return id
}
