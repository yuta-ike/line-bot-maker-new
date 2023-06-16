import { ID } from "appwrite"

import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { adminDatabase } from "@/lib/appwriteAdmin/core"

export const updateStatistics = async (id: string, result: boolean) => {
  try {
    await adminDatabase.createDocument(
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
