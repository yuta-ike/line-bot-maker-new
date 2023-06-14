import { Metadata } from "next"
import { FiPlus } from "react-icons/fi"
import Link from "next/link"

import WorkCard from "./_components/WorkCard"
import DashboardTab from "./_components/DashboardTab"

const DashboardPage = () => {
  return (
    <>
      {/* Heading */}
      <div className="w-full pt-8 bg-white border-b border-slate-200">
        <div className="max-w-full px-8 mx-auto w-container">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-600">わたしの作品</h1>
            <Link
              href="/work/001/edit"
              className="flex items-center rounded-lg border-2 border-orange-400 px-4 py-2 text-sm font-bold text-orange-400 transition hover:bg-orange-50 active:translate-y-0.5"
            >
              <FiPlus className="inline" strokeWidth={4} />
              <span>新しいプログラムを作成</span>
            </Link>
          </div>
          <DashboardTab className="mt-6" />
        </div>
      </div>

      {/* Body */}
      <div className="flex max-w-full mx-auto w-container">
        <main className="p-8 grow">
          <div
            className="grid w-full gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <WorkCard key={i} className="w-full" />
              ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default DashboardPage

export const metadata: Metadata = {
  title: "ボットラボ",
}
