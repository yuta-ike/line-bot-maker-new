import { DATABASE_ID, collections } from "@/lib/appwrite/constants"
import { adminDatabase } from "@/lib/appwriteAdmin/core"

const APPWRITE_PRJECT_ID = process.env["NEXT_PUBLIC_APPWRITE_PRJECT_ID"]
const APP_WRITE_API_KEY = process.env["APP_WRITE_API_KEY"]

if (APPWRITE_PRJECT_ID == null) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PRJECT_ID is not set")
}

if (APP_WRITE_API_KEY == null) {
  throw new Error("APP_WRITE_API_KEY is not set")
}

export const getProgram = async (id: string) => {
  const doc = await adminDatabase.getDocument(
    DATABASE_ID,
    collections.programEditor,
    id,
  )
  const _doc = doc as any

  return {
    id: doc.$id,
    program: _doc["program"] as string,
  }
}
