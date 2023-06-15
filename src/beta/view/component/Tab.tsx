import classNames from "classnames"
import Link from "next/link"
import React, { useEffect, useMemo, useRef, useState } from "react"

export type TabProps<Id extends string> = {
  tabs: readonly {
    id: Id
    label: string
  }[]
  selected: string
  className?: string
}

const Tab = <Id extends string>({
  tabs,
  selected,
  className,
}: TabProps<Id>): React.ReactElement => {
  const tabCenterRefs = useRef<number[]>([])
  const tabWidthRefs = useRef<number[]>([])
  const selectedIndex = useMemo(() => {
    const index = tabs.findIndex(({ id }) => id === selected)
    if (index < 0) {
      return null
    }
    return index
  }, [tabs, selected])

  // TODO: 実装が汚いので直す
  const [isInitial, setIsInitial] = useState(true)
  useEffect(() => {
    setIsInitial(false)
  }, [])

  return (
    <div className={classNames("relative", className)}>
      <div className="flex items-center space-x-2">
        {tabs.map(({ id, label }, i) => {
          const isActive = id === selected
          return (
            <Link href={`/dashboard?filter=${id}`} key={id}>
              <div
                ref={(elm) => {
                  if (elm == null) {
                    return
                  }
                  const rect = elm.getBoundingClientRect()
                  tabCenterRefs.current[i] = rect.x + rect.width / 2
                  tabWidthRefs.current[i] = rect.width
                }}
                className={classNames(
                  "p-2 text-sm font-bold transition",
                  isActive
                    ? "text-slate-600"
                    : "text-slate-400 hover:text-slate-600",
                )}
              >
                {label}
              </div>
            </Link>
          )
        })}
      </div>
      <div
        className={classNames(
          "absolute bottom-0 h-[3px] w-[40px] translate-y-1/2 rounded-full bg-slate-600",
          !isInitial && "transition-[left]",
        )}
        style={{
          left:
            selectedIndex == null
              ? undefined
              : (tabCenterRefs.current[selectedIndex] ?? 0) -
                (tabCenterRefs.current[0] ?? 0) +
                (tabWidthRefs.current[0] ?? 0) / 2 -
                (tabWidthRefs.current[selectedIndex] ?? 0) / 2,
          width:
            selectedIndex == null
              ? undefined
              : tabWidthRefs.current[selectedIndex] ?? 0,
        }}
      />
    </div>
  )
}

export default Tab
