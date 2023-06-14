"use client"

import { UrlObject } from "url"

import classNames from "classnames"
import { RouteType } from "next/dist/lib/load-custom-routes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export type MenuItemProps = {
  href: __next_route_internal_types__.RouteImpl<RouteType> | UrlObject
  children: string
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = ({ href, children, className }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        "group relative text-sm font-bold text-slate-600 transition hover:text-orange-500",
        className,
      )}
    >
      {children}
      <div className="absolute left-1/2 top-[120%] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-orange-400 opacity-0 transition-[width] group-hover:w-[48px] group-hover:opacity-100" />
    </Link>
  )
}

export default MenuItem
