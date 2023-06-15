import { Client, Databases } from "node-appwrite"

const APPWRITE_PRJECT_ID = process.env["NEXT_PUBLIC_APPWRITE_PRJECT_ID"]
const APP_WRITE_API_KEY = process.env["APP_WRITE_API_KEY"]

if (APPWRITE_PRJECT_ID == null) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PRJECT_ID is not set")
}

if (APP_WRITE_API_KEY == null) {
  throw new Error("APP_WRITE_API_KEY is not set")
}

export const appwriteAdmin = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APPWRITE_PRJECT_ID) // Your project ID
  .setKey(APP_WRITE_API_KEY) // Your secret API key

export const adminDatabase = new Databases(appwriteAdmin)
