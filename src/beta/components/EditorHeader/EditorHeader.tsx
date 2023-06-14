import classNames from "classnames"
import React, { useState } from "react"
import { FiHome, FiShare } from "react-icons/fi"
import Link from "next/link"
import { useParams } from "next/navigation"

import { useIsDragging } from "@/beta/services/move/isDragging"
import Tooltip from "@/beta/view/atoms/Tooltop"
import EditableText from "@/beta/view/component/EditableText"

import { useSaveEditorSnapshot } from "./useSaveEditorSnapshot"

export type EditorHeaderProps = {
  className?: string
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ className }) => {
  const params = useParams() as { workId: string }
  const workId = params.workId

  // drag
  const isDragging = useIsDragging()

  // save
  const { trigger: saveEditorSnapshot, isMutating } =
    useSaveEditorSnapshot(workId)

  const [title, setTitle] = useState("天気予報プログラム")

  return (
    <header
      className={classNames(
        "fixed inset-x-0 top-0 grid w-full gap-4 border-b border-slate-200 bg-white/90 px-4 py-3",
        isDragging && "transition hover:opacity-30",
        className,
      )}
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Tooltip label="作品ページ">
        <Link
          href="/dashboard"
          aria-label="作品ページに戻る"
          className="grid h-9 w-[38px] place-items-center rounded-lg border-[1.5px] border-slate-200 text-slate-600 transition hover:border-slate-400 active:translate-y-0.5"
        >
          <FiHome strokeWidth={2.5} />
        </Link>
      </Tooltip>
      <h1 className="flex items-center space-x-2 place-self-center font-bold text-slate-600">
        <span className="mr-2 text-lg">🌤️ </span>
        <EditableText value={title} onChange={setTitle} />
      </h1>
      <div className="flex items-center place-self-end">
        <button
          onClick={() => saveEditorSnapshot()}
          disabled={isMutating}
          className="shrink-0 rounded-lg border-[1.5px] border-slate-200 px-4 py-1.5 text-sm font-bold text-slate-500 transition hover:border-slate-400 active:translate-y-0.5 disabled:opacity-50"
        >
          保存
        </button>
        {/* <div className="mr-4 flex items-center">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <button
                key={i}
                className="-mx-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 text-sm font-bold text-white shadow-orange-200 transition-[margin] hover:mx-1"
              >
                Y
              </button>
            ))}
        </div>
        <button className="flex shrink-0 items-center space-x-2 rounded-lg border-[1.5px] border-slate-200 px-4 py-1.5 text-sm font-bold text-slate-500 transition hover:border-slate-400 active:translate-y-0.5">
          <FiPlus strokeWidth={3} />
          招待
        </button> */}
        <hr className="!mx-4 block h-9 w-[1px] bg-slate-200" />
        <Tooltip label="共有">
          <button
            className="mr-2 grid h-9 w-[38px] shrink-0 place-items-center rounded-lg bg-slate-500 text-white transition hover:bg-slate-700 hover:shadow active:translate-y-0.5 active:shadow-none"
            aria-label="共有する"
          >
            <FiShare strokeWidth={2.5} />
          </button>
        </Tooltip>
        <button className="shrink-0 rounded-lg border-[1.5px] border-slate-200 px-4 py-1.5 text-sm font-bold text-slate-500 transition hover:border-slate-400 active:translate-y-0.5">
          公開
        </button>
      </div>
    </header>
  )
}

export default EditorHeader
