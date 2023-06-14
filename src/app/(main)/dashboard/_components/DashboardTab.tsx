"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import Tab from "@/beta/view/component/Tab"

const TABS = [
  { id: "all", label: "すべて" },
  { id: "public", label: "公開中" },
  { id: "draft", label: "下書き" },
] as const

export type TabId = (typeof TABS)[number]["id"]

export type DashboardTabProps = {
  className?: string
}

const DashboardTab: React.FC<DashboardTabProps> = ({ className }) => {
  const searchParams = useSearchParams()
  const selected = searchParams.get("filter") as TabId | null

  return (
    <Tab<TabId>
      tabs={TABS}
      selected={selected ?? "all"}
      className={className}
    />
  )
}

export default DashboardTab
