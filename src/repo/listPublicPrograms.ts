import { Query } from "appwrite"

import { getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

import { ProgramSchema } from "./type"

export const listPublicPrograms = async () => {
  const database = getDatabase()

  const data = await database.listDocuments(
    DATABASE_ID,
    collections.programEditor,
    [Query.equal("is_public", true), Query.orderDesc("$updatedAt")],
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
        example: doc["example"] as string,
        isPublic: doc["is_public"] as boolean,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
      } satisfies ProgramSchema),
  )
}
