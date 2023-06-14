import React from "react"
import { FiPlay } from "react-icons/fi"

import { useTestcaseIds } from "@/beta/services/testcase/testcase"

import TestcaseSummary from "./TestcaseSummary"
import TestcaseItem from "./TestcaseItem/TestcaseItem"

const Testcase = () => {
  const testcaseIds = useTestcaseIds()

  return (
    <div className="h-full w-full">
      <div className="m-4">
        <button className="flex w-full items-center justify-center space-x-1 rounded bg-orange-400 px-2 py-2 text-sm font-bold text-white transition hover:bg-orange-500 active:translate-y-px">
          <FiPlay strokeWidth={3} />
          <span>全てのテストケースを実行</span>
        </button>
      </div>
      <TestcaseSummary className="mx-auto mt-4 w-full" />
      <section className="mt-4 space-y-2 p-4">
        {testcaseIds.map((testcaseId) => (
          <TestcaseItem
            key={testcaseId}
            testcaseId={testcaseId}
            status="success"
          />
        ))}
      </section>
    </div>
  )
}

export default Testcase
