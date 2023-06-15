import React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { FiChevronDown, FiCheck } from "react-icons/fi"
import classNames from "classnames"

export type SelectProps<Id extends string> = {
  options: { id: Id; label: string }[]
  value: Id
  onChange: (id: Id) => void
  className?: string
  id?: string
}

const Select = <Id extends string>({
  options,
  value,
  onChange,
  className,
  id,
}: SelectProps<Id>) => {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange}>
      <RadixSelect.Trigger
        className={classNames(
          "flex w-full items-center justify-between rounded border border-slate-200 p-2 text-slate-600 focus:border-slate-400 focus:outline-none",
          className,
        )}
        aria-label="Food"
        id={id}
      >
        <RadixSelect.Value
          placeholder="Please select a mock value"
          className="w-full placeholder:text-slate-400"
        />
        <RadixSelect.Icon className="text-violet11">
          <FiChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="overflow-hidden rounded-lg border border-slate-100 bg-white p-2 shadow-popper"
          position="popper"
          align="end"
          sideOffset={4}
        >
          <RadixSelect.Viewport className="">
            {options.map(({ id, label }) => (
              <RadixSelect.Item
                key={id}
                value={id}
                className="flex cursor-pointer items-center justify-between space-x-4 rounded-lg px-4 py-2 outline-none focus:bg-slate-100"
              >
                <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                  <FiCheck />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export default Select
