import { Account, Client, Databases } from "appwrite"

let client: Client | null = null

const APPWRITE_PRJECT_ID = process.env["NEXT_PUBLIC_APPWRITE_PRJECT_ID"]

if (APPWRITE_PRJECT_ID == null) {
  throw new Error("APPWRITE_PRJECT_ID is not set")
}

const generateClient = () => {
  if (client != null) {
    return client
  } else {
    client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(APPWRITE_PRJECT_ID)
    return client
  }
}

let account: Account | null = null

export const getAccount = () => {
  if (account != null) {
    return account
  }
  const client = generateClient()
  account = new Account(client)
  return account
}

export const getDatabase = () => {
  const client = generateClient()
  const database = new Databases(client)
  return database
}
