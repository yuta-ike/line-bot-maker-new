import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IconType } from "react-icons"

export type DropdownProps<Id extends string> = {
  children: React.ReactNode
  items: {
    icon?: IconType
    id: Id
    label: string
  }[]
  onClick: (id: Id) => void
}

const Dropdown = <Id extends string>({
  children,
  items,
  onClick,
}: DropdownProps<Id>) => {
  return (
    <>
      <style jsx>{`
        @keyframes dropdown-slideup {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-20 min-w-[180px] animate-[dropdown-slideup_100ms_ease-out] rounded-lg border border-slate-100 bg-white p-2 shadow-popper"
            sideOffset={8}
          >
            {items.map(({ id, label, icon: Icon }) => (
              <DropdownMenu.Item
                key={id}
                onClick={() => onClick(id)}
                className="flex cursor-pointer items-center rounded-md p-2 text-sm text-slate-500 outline-none data-highlighted:bg-slate-100 data-highlighted:text-slate-800"
              >
                {Icon != null && <Icon className="mr-1.5" />}
                {label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}

export default Dropdown
