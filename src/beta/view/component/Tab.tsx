import classNames from "classnames"
import React, { useEffect, useMemo, useRef, useState } from "react"

export type TabProps<Id extends string> = {
  tabs: {
    id: Id
    label: string
  }[]
  selected: string
  onSelect: (id: string) => void
  className?: string
}

const Tab = <Id extends string>({
  tabs,
  selected,
  onSelect,
  className,
}: TabProps<Id>): React.ReactElement => {
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
    <div
      className={classNames("relative flex items-center space-x-2", className)}
    >
      {tabs.map(({ id, label }, i) => {
        const isActive = id === selected
        return (
          <button
            key={id}
            ref={(elm) => {
              if (elm == null) {
                return
              }
              const rect = elm.getBoundingClientRect()
              tabWidthRefs.current[i] = rect.x + rect.width / 2 - 20
            }}
            onClick={() => onSelect(id)}
            className={classNames(
              "p-2 text-sm font-bold transition",
              isActive
                ? "text-slate-600"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            {label}
          </button>
        )
      })}
      <div
        className={classNames(
          "absolute bottom-0 h-[3px] w-[40px] translate-y-1/2 rounded-full bg-slate-600",
          !isInitial && "transition-[left]",
        )}
        style={{
          left:
            selectedIndex == null
              ? undefined
              : (tabWidthRefs.current[selectedIndex] ?? 0) -
                (tabWidthRefs.current[0] ?? 0),
        }}
      />
    </div>
  )
}

export default Tab
