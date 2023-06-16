import { Query } from "appwrite"

import { getDatabase } from "@/lib/appwrite/core"
import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

import { StatisticsItem } from "./type"

export const getStatistics = async (programId: string) => {
  const database = getDatabase()

  const data = await database.listDocuments(
    DATABASE_ID,
    collections.statistics,
    [Query.equal("program_id", programId)],
  )

  const items = data.documents.map(
    (doc) =>
      ({
        id: doc.$id,
        result: doc["result"] as boolean,
        createdAt: doc.$createdAt,
      } satisfies StatisticsItem),
  )

  return {
    summary: {
      total: items.length,
      success: items.filter((item) => item.result).length,
      failed: items.filter((item) => !item.result).length,
    },
    items,
  }
}
