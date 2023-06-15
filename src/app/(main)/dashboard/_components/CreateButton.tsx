import React from "react"
import { FiPlus } from "react-icons/fi"
import classNames from "classnames"
import Link from "next/link"

export type CreateButtonProps = {
  className?: string
}

const CreateButton = ({ className }: CreateButtonProps) => {
  return (
    <Link
      href="/dashboard/new"
      // onClick={handleCreate}
      className={classNames(
        "flex items-center rounded-lg border-2 border-orange-400 px-4 py-2 text-sm font-bold text-orange-400 transition hover:bg-orange-50 active:translate-y-0.5",
        // (isMutating || isPending) && "cursor-progress opacity-50",
        className,
      )}
    >
      <FiPlus className="inline" strokeWidth={4} />
      <span>New Bot Program</span>
    </Link>
  )
}

export default CreateButton
