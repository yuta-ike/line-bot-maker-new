import { Query } from "appwrite"

import { getAccount, getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

import { ProgramSchema } from "./type"

export const listPrograms = async () => {
  const database = getDatabase()
  const account = getAccount()
  const user = await account.get()

  const data = await database.listDocuments(
    DATABASE_ID,
    collections.programEditor,
    [
      Query.equal("created_by", user.$id),
      // Query.select([
      //   // "$id",
      //   // "$createdAt",
      //   // "$updatedAt",
      //   "title",
      //   "created_by",
      //   "created_by_name",
      //   "description",
      //   "instruction",
      //   "is_public",
      // ]),
      Query.orderDesc("$updatedAt"),
    ],
  )

  return data.documents.map(
    (doc) =>
      ({
        id: doc.$id,
        title: doc["title"],
        createdBy: {
          id: doc["created_by"] as string,
          name: doc["created_by_name"] as string,
        },
        description: doc["description"] as string,
        instruction: doc["instruction"] as string,
        isPublic: doc["is_public"] as boolean,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
      } satisfies ProgramSchema),
  )
}
