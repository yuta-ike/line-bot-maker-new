import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { getDatabase } from "@/lib/appwrite/core"

import { ProgramSchema } from "./type"

export const getProgram = async (id: string) => {
  const database = getDatabase()

  const doc = await database.getDocument(
    DATABASE_ID,
    collections.programEditor,
    id,
  )

  return {
    id: doc.$id,
    title: doc["title"] as string,
    createdBy: {
      id: doc["created_by"] as string,
      name: doc["created_by_name"] as string,
    },
    // @ts-ignore
    nodeCount: JSON.parse(doc["program"] as string).nodes.length,
    description: doc["description"] as string,
    example: doc["example"] ?? ("" as string),
    instruction: doc["instruction"] as string,
    isPublic: doc["is_public"] as boolean,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt,
  } satisfies ProgramSchema
}
