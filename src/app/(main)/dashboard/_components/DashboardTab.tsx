"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import Tab from "@/beta/view/component/Tab"

const TABS = [
  { id: "all", label: "All" },
  { id: "public", label: "Public" },
  { id: "draft", label: "Draft" },
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
