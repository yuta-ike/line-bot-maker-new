import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { getAccount, getDatabase } from "@/lib/appwrite/core"

import { ProgramSchema } from "./type"

export const getProgram = async (id: string) => {
  const database = getDatabase()
  const account = getAccount()
  const user = await account.get()

  console.log("APPLE")
  const doc = await database.getDocument(
    DATABASE_ID,
    collections.programEditor,
    id,
    // [
    //   Query.select([
    //     // "$id",
    //     // "$createdAt",
    //     // "$updatedAt",
    //     "title",
    //     "created_by",
    //     "created_by_name",
    //     "description",
    //     "instruction",
    //     "is_public",
    //   ]),
    // ],
  )

  return {
    id: doc.$id,
    title: "Unknown",
    createdBy: {
      id: doc["created_by"] as string,
      name: doc["created_by_name"] as string,
    },
    description: doc["description"] as string,
    instruction: doc["instruction"] as string,
    isPublic: doc["is_public"] as boolean,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt,
  } satisfies ProgramSchema
}
