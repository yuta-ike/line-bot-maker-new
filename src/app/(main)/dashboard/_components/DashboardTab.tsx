"use client"

import React from "react"

import Tab from "@/beta/view/component/Tab"
import { useQuerySync } from "@/utils/useQuerySync"

const TABS = [
  { id: "all", label: "すべて" },
  { id: "public", label: "公開中" },
  { id: "draft", label: "下書き" },
]

export type TabId = (typeof TABS)[number]["id"]

export type DashboardTabProps = {
  className?: string
}

const DashboardTab: React.FC<DashboardTabProps> = ({ className }) => {
  const [selected, setSelected] = useQuerySync<TabId>(
    "filter",
    TABS.map(({ id }) => id),
    "all",
  )
  // const [selected, setSelected] = useState("all")

  // const [selected, setSelected] = useState<TabId | undefined>(undefined)

  return (
    <Tab<TabId>
      tabs={TABS}
      selected={selected ?? "all"}
      onSelect={setSelected}
      className={className}
    />
  )
}

export default DashboardTab
