import { ID } from "appwrite"

import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { getDatabase } from "@/lib/appwrite/core"

export const updateStatistics = async (id: string, result: boolean) => {
  const database = getDatabase()

  try {
    await database.createDocument(
      DATABASE_ID,
      collections.statistics,
      ID.unique(),
      {
        program_id: id,
        result,
      },
    )
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
