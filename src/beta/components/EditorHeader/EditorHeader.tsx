import classNames from "classnames"
import React, { useState } from "react"
import { FiHome, FiShare } from "react-icons/fi"
import Link from "next/link"
import { useParams } from "next/navigation"

import { useIsDragging } from "@/beta/services/move/isDragging"
import Tooltip from "@/beta/view/atoms/Tooltop"
import EditableText from "@/beta/view/component/EditableText"
import { saveProgramTitle } from "@/repo/saveProgramTitle"

import { useSaveEditorSnapshot } from "./useSaveEditorSnapshot"
import { useUpdatePublication } from "./useUpdatePublication"

export type EditorHeaderProps = {
  initTitle: string
  initIsPublic: boolean
  className?: string
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  initTitle,
  initIsPublic,
  className,
}) => {
  const params = useParams() as { workId: string }
  const workId = params.workId

  // drag
  const isDragging = useIsDragging()

  // save
  const { trigger: saveEditorSnapshot, isMutating } =
    useSaveEditorSnapshot(workId)

  const [title, setTitle] = useState(initTitle)
  const [isPublic, setPublic] = useState(initIsPublic)

  const handleSubmit = () => {
    saveProgramTitle({ id: workId, title })
  }

  const { trigger: updatePublication, isMutating: isMutatingPublication } =
    useUpdatePublication(workId)

  const handlePublic = async () => {
    if (isPublic) {
      await updatePublication(false)
      setPublic(false)
    } else {
      const ok = window.confirm(
        "公開すると、作品ページから他の人が見れるようになります。公開しますか？",
      )
      if (ok) {
        await updatePublication(true)
        setPublic(true)
      }
    }
  }

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
      <form
        className="flex items-center space-x-2 place-self-center font-bold text-slate-600"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <span className="mr-2 text-lg">🌤️ </span>
        <EditableText value={title} onChange={setTitle} onBlur={handleSubmit} />
      </form>
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
        <button
          onClick={handlePublic}
          disabled={isMutatingPublication}
          className="shrink-0 rounded-lg border-[1.5px] border-slate-200 px-4 py-1.5 text-sm font-bold text-slate-500 transition hover:border-slate-400 active:translate-y-0.5 disabled:opacity-50"
        >
          {isPublic ? "公開停止" : "公開"}
        </button>
      </div>
    </header>
  )
}

export default EditorHeader
