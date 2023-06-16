import { toast } from "react-toastify"
import useSWRMutate from "swr/mutation"

import { getAccount } from "@/lib/appwrite/core"

export const useUpdateName = () =>
  useSWRMutate("update_name", async (_, { arg }: { arg: { name: string } }) => {
    const account = getAccount()
    await account.updateName(arg.name)

    toast("Name updated")
  })
