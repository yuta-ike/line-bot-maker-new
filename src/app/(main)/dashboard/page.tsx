import { Metadata } from "next"

import CreateButton from "./_components/CreateButton"
import DashboardTab from "./_components/DashboardTab"
import WorkCardList from "./_components/WorkCardList"

const DashboardPage = () => {
  return (
    <>
      {/* Heading */}
      <div className="w-full border-b border-slate-200 bg-white pt-8">
        <div className="mx-auto w-container max-w-full px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-600">わたしの作品</h1>
            <CreateButton />
          </div>
          <DashboardTab className="mt-6" />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto flex w-container max-w-full">
        <main className="grow p-8">
          <WorkCardList className="w-full" />
        </main>
      </div>
    </>
  )
}

export default DashboardPage

export const metadata: Metadata = {
  title: "ボットラボ",
}
