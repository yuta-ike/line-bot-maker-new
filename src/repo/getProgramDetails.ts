import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { getDatabase } from "@/lib/appwrite/core"
import { BlockNode } from "@/beta/services/selector/blockNode"
import { BlockEdge } from "@/beta/services/selector/blockEdge"
import { ChatItem } from "@/beta/components/SidePanel/Emulator/chatHistory"

import { ProgramDetailSchema } from "./type"

export const getProgramDetails = async (id: string) => {
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
    description: doc["description"] as string,
    instruction: doc["instruction"] as string,
    example: doc["example"] ?? ("" as string),
    isPublic: doc["is_public"] as boolean,
    program: JSON.parse(doc["program"]) as {
      nodes: BlockNode[]
      edges: BlockEdge[]
    },
    debugState: JSON.parse(doc["debug_state"]) as {
      simulatorInput: string
      chatHistory: ChatItem[]
    },
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt,
  } satisfies ProgramDetailSchema
}
