import useSWR from "swr"

import { getAccount } from "./core"

export const useUser = () =>
  useSWR("fetch_user", async () => {
    const account = getAccount()
    const user = await account.get()
    return user
  })
