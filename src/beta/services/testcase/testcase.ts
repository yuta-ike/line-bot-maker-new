import {
  DefaultValue,
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil"

import { genId } from "@/utils/genId"

export type Testcase = {
  id: string
  order: number
  title: string
  input: {
    type: "string"
    value: string
  }
  expected: {
    type: "string"
    value: string
  }
  mockProps: Record<string, unknown>
}

export const _testcaseState = atomFamily<Testcase, string>({
  key: "atom/_testcase",
  default: (id) => {
    if (id === "0") {
      return {
        id: "0",
        order: 0,
        title: "テストケース1",
        input: {
          type: "string",
          value: "テスト",
        },
        expected: {
          type: "string",
          value: "テスト",
        },
        mockProps: {},
      }
    } else {
      throw new Error()
    }
  },
})

export const testcaseIdsState = atom<Set<string>>({
  key: "atom/testcaseIds",
  default: new Set(["0"]),
})

export const testcaseState = selectorFamily<Testcase, string>({
  key: "selector/testcase",
  get:
    (id) =>
    ({ get }) => {
      const testcase = get(_testcaseState(id))
      if (!testcase) {
        throw new Error("testcase is undefined")
      }
      return testcase
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        set(testcaseIdsState, (prev) => {
          prev.delete(id)
          return new Set(prev)
        })
      } else {
        set(testcaseIdsState, (prev) => new Set([...prev, id]))
      }

      set(_testcaseState(id), newValue)
    },
})

export const testcaseStates = selector<Testcase[]>({
  key: "selector/testcases",
  get: ({ get }) => {
    const ids = get(testcaseIdsState)
    return [...ids].map((id) => get(testcaseState(id)))
  },
})

export const sortedTestcaseIdsStates = selector<string[]>({
  key: "selector/sortedTestcases",
  get: ({ get }) => {
    const testcases = get(testcaseStates)
    return testcases
      .sort((a, b) => a.order - b.order)
      .map((testcase) => testcase.id)
  },
})

export const useTestcaseIds = () => useRecoilValue(sortedTestcaseIdsStates)

export const useTestcase = (id: string) => useRecoilValue(testcaseState(id))

export const useTestcaseOperations = () => {
  const addTestcase = useRecoilCallback(
    ({ set }) =>
      (testcase: Omit<Testcase, "id">) => {
        const id = genId()
        set(testcaseState(id), { id, ...testcase })
      },
    [],
  )

  const deleteTestcase = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(testcaseState(id))
      },
    [],
  )

  const updateTestcase = useRecoilCallback(
    ({ set }) =>
      (id: string, testcase: Testcase) => {
        set(testcaseState(id), testcase)
      },
    [],
  )

  return { addTestcase, deleteTestcase, updateTestcase }
}
