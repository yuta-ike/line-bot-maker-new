import format from "date-fns/format"
import React from "react"
import classNames from "classnames"

import TextWithSkelton from "@/components/TextWithSkelton"
import { ProgramSchema } from "@/repo/type"

export type MetaDataTableProps = {
  program: ProgramSchema | null
  className?: string
}

const MetaDataTable = ({ program, className }: MetaDataTableProps) => {
  return (
    <dl
      className={classNames(
        "rounded-xl border border-slate-200 p-2 text-sm text-slate-600",
        className,
      )}
    >
      <div className="flex items-center justify-between p-2">
        <dt className="text-slate-500">作成日</dt>
        <TextWithSkelton as="dd" className="min-w-[64px]">
          {program == null
            ? null
            : format(new Date(program.createdAt), "yyyy/M/d")}
        </TextWithSkelton>
      </div>
      <div className="flex items-center justify-between p-2">
        <dt className="text-slate-500">最終更新日</dt>
        <TextWithSkelton as="dd" className="min-w-[64px]">
          {program == null
            ? null
            : format(new Date(program.updatedAt), "yyyy/M/d")}
        </TextWithSkelton>
      </div>
      {/* <div className="flex items-center justify-between p-2">
                <dt className="text-slate-500">使用ブロック数</dt>
                <dd>14</dd>
              </div> */}
    </dl>
  )
}

export default MetaDataTable
