import React from "react"
import { FiCrosshair } from "react-icons/fi"
import TextareaAutosize from "react-textarea-autosize"

import Select from "@/beta/components/Select/Select"
import { useFocus } from "@/beta/services/focus/focus"
import { useMockValue } from "@/beta/services/mock/mock"

import Tooltip from "../../atoms/Tooltop"

import { useBlockNodeWithMock } from "./useMockFields"

export type MockFieldProps = {
  id: string
}

const MockField = ({ id }: MockFieldProps) => {
  // focus
  const focus = useFocus()

  // mock field
  const mockField = useBlockNodeWithMock(id)

  // mock value
  const [mockValue, setMockValue] = useMockValue(id)

  return (
    <div key={id} className="flex w-full flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <label htmlFor={id} className="shrink-0 text-sm text-slate-500">
          {mockField.name}
        </label>
        <Tooltip label="フォーカスする">
          <button
            onClick={() => focus(id)}
            aria-label="フォーカスする"
            className="shrink-0"
          >
            <FiCrosshair className="text-slate-400 transition hover:text-slate-600 active:translate-y-[1px]" />
          </button>
        </Tooltip>
      </div>
      {mockField.mockType === "socket" ? (
        <Select
          className="ml-auto w-full"
          id={id}
          options={mockField.options}
          value={mockValue?.socketId}
          onChange={(socketId) =>
            setMockValue((prev) => ({ ...prev, socketId }))
          }
        />
      ) : (
        <TextareaAutosize
          minRows={1}
          placeholder="Fill mock value"
          value={mockValue?.value ?? ""}
          onChange={(e) =>
            setMockValue((prev) => ({ ...prev, value: e.target.value }))
          }
          className="w-full resize-none rounded border border-slate-200 p-2 text-slate-600 focus:border-slate-400 focus:outline-none"
        />
      )}
    </div>
  )
}

export default MockField
