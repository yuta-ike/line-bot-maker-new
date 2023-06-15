import useSWR from "swr"

import { getProgramDetails } from "@/repo/getProgramDetails"

export const useProgramDetail = (id: string | null) =>
  useSWR(id == null ? null : [id, "fetch_program_details"], ([id]) =>
    getProgramDetails(id),
  )
