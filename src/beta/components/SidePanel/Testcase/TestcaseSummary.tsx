import classNames from "classnames"
import React from "react"

export type TestcaseSummaryProps = {
  className?: string
}

const TestcaseSummary: React.FC<TestcaseSummaryProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        "border-y border-slate-200 bg-slate-50 text-sm text-slate-600",
        className,
      )}
    >
      <section className="p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-bold text-slate-600">テスト結果</h3>
          <div>合計45</div>
        </div>
        <div className="my-4">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-500">
            <div
              className="absolute bottom-0 right-0 top-0 border-l-2 border-white bg-red-500"
              style={{ width: "88%" }}
            />
          </div>
        </div>
        <dl className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">合格数</dt>
            <dd>3ケース (12%)</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">エラー数</dt>
            <dd>12ケース (67%)</dd>
          </div>
        </dl>
      </section>
      <hr />
      <section className="p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="font-bold text-slate-600">テストカバレッジ</h3>
          <div className="font-bold text-slate-600">38%</div>
        </div>
        <div className="my-4">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-500">
            <div
              className="absolute bottom-0 right-0 top-0 border-l-2 border-white bg-slate-300"
              style={{ width: "88%" }}
            />
          </div>
        </div>
        <dl className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">ブロックカバレッジ</dt>
            <dd>12%</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500">エッジカバレッジ</dt>
            <dd>67%</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}

export default TestcaseSummary
