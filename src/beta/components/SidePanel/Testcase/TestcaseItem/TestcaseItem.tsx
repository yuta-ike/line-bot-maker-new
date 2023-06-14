import classNames from "classnames"
import React from "react"
import TextareaAutosize from "react-textarea-autosize"
import * as Accordion from "@radix-ui/react-accordion"
import { FiCheck, FiChevronDown, FiX } from "react-icons/fi"

import {
  useTestcase,
  useTestcaseOperations,
} from "@/beta/services/testcase/testcase"

export type TestcaseItemProps = {
  status: "success" | "failure" | "pending"
  testcaseId: string
  className?: string
}

const TestcaseItem = ({ status, testcaseId, className }: TestcaseItemProps) => {
  const testcase = useTestcase(testcaseId)
  const { updateTestcase } = useTestcaseOperations()

  return (
    <Accordion.Root
      type="single"
      defaultValue="item-1"
      collapsible
      data-result={status}
      className={classNames(
        "group space-y-2 rounded-lg border border-slate-200 px-4 data-[result=failure]:border-red-500",
        className,
      )}
    >
      <Accordion.Item value="item-1" className="group">
        <Accordion.Trigger className="group/title flex w-full items-center justify-between py-2 text-sm text-slate-600 transition-[padding] group-data-open:py-4 group-data-[result=failure]:text-red-600">
          <div className="flex items-center">
            <div className="mr-2 grid h-4 w-4 place-items-center rounded-full group-data-[result=failure]:bg-red-500 group-data-[result=pending]:bg-slate-300 group-data-[result=success]:bg-emerald-500">
              {status === "success" ? (
                <FiCheck className="text-white" strokeWidth={4} size={10} />
              ) : status === "failure" ? (
                <FiX className="text-white" strokeWidth={4} size={10} />
              ) : null}
            </div>
            <span>{testcase.title}</span>
          </div>
          <div className="rounded-full p-1 transition group-hover/title:bg-slate-900/5 group-data-open:rotate-180">
            <FiChevronDown />
          </div>
        </Accordion.Trigger>
        <Accordion.Content className="space-y-2 py-4 pt-0">
          <div className="flex">
            <div className="mr-4 mt-2 shrink-0 text-sm font-bold text-slate-400">
              入力
            </div>
            <TextareaAutosize
              placeholder="入力"
              value={testcase.input.value}
              onChange={(e) =>
                updateTestcase(testcaseId, {
                  ...testcase,
                  input: { ...testcase.input, value: e.target.value },
                })
              }
              className="w-full resize-none rounded border border-slate-200 p-2 text-sm transition focus:border-slate-400 focus:outline-none"
            />
          </div>
          <div className="flex">
            <div className="mr-4 mt-2 shrink-0 text-sm font-bold text-slate-400">
              正解
            </div>
            <TextareaAutosize
              placeholder="正解"
              value={testcase.expected.value}
              onChange={(e) =>
                updateTestcase(testcaseId, {
                  ...testcase,
                  expected: { ...testcase.expected, value: e.target.value },
                })
              }
              className="w-full resize-none rounded border border-slate-200 p-2 text-sm transition focus:border-slate-400 focus:outline-none"
            />
          </div>
          <hr />
          <div className="flex space-x-4">
            <div className="mt-2 shrink-0 text-sm font-bold text-slate-400">
              結果
            </div>
            <div className="w-full rounded border border-slate-200 bg-slate-50 p-2 text-sm">
              Hello, world!
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}

export default TestcaseItem
