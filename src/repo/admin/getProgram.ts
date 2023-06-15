import axios from "axios"

import { DATABASE_ID, collections } from "@/lib/appwrite/constants"

import { ProgramSchema } from "../type"

const APPWRITE_PRJECT_ID = process.env["NEXT_PUBLIC_APPWRITE_PRJECT_ID"]
const APP_WRITE_API_KEY = process.env["APP_WRITE_API_KEY"]

if (APPWRITE_PRJECT_ID == null) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PRJECT_ID is not set")
}

if (APP_WRITE_API_KEY == null) {
  throw new Error("APP_WRITE_API_KEY is not set")
}

export const getProgram = async (id: string) => {
  console.log(
    `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${collections.programEditor}/documents/${id}`,
  )
  const res = await axios.get(
    `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${collections.programEditor}/documents/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Response-Format": "1.0.0",
        "X-Appwrite-Project": APPWRITE_PRJECT_ID,
        "X-Appwrite-Key": APP_WRITE_API_KEY,
      },
      timeout: 10000,
    },
  )
  // const json = await res.json()

  // const doc = await adminDatabase.getDocument(
  //   DATABASE_ID,
  //   collections.programEditor,
  //   id,
  // )
  const doc = res.data
  const _doc = doc as any

  return {
    id: doc.$id,
    title: "Unknown",
    createdBy: {
      id: _doc["created_by"] as string,
      name: _doc["created_by_name"] as string,
    },
    description: _doc["description"] as string,
    instruction: _doc["instruction"] as string,
    isPublic: _doc["is_public"] as boolean,
    createdAt: doc.$createdAt,
    updatedAt: doc.$updatedAt,
  } satisfies ProgramSchema
}
