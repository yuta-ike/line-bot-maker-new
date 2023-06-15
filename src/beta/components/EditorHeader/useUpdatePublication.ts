import useSWRMutate from "swr/mutation"

import { updatePublication } from "@/repo/updatePublication"

export const useUpdatePublication = (id: string) =>
  useSWRMutate(
    ["update_publication"],
    (_, { arg: isPublic }: { arg: boolean }) =>
      updatePublication({ id, isPublic }),
  )
