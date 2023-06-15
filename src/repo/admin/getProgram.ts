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
  // console.log(
  //   `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${collections.programEditor}/documents/${id}`,
  // )
  // const res = await axios.get(
  //   `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${collections.programEditor}/documents/${id}`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Appwrite-Response-Format": "1.0.0",
  //       "X-Appwrite-Project": APPWRITE_PRJECT_ID,
  //       "X-Appwrite-Key": APP_WRITE_API_KEY,
  //     },
  //     timeout: 10000,
  //   },
  // )
  // const json = await res.json()

  const doc = await adminDatabase.getDocument(
    DATABASE_ID,
    collections.programEditor,
    id,
  )
  // const doc = res.data
  const _doc = doc as any

  return {
    id: doc.$id,
    program: _doc["program"] as string,
  }
}
