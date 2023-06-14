"use client"

// https://github.com/apal21/nextjs-progressbar/issues/86#issuecomment-1447977706

import { useEffect } from "react"
import NProgress from "nprogress"
import "./ProgressBar.css"

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
]

export default function ProgressBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    let timer: NodeJS.Timeout | null = null

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href
      const currentUrl = location.href
      if (targetUrl !== currentUrl) {
        timer = setTimeout(() => {
          NProgress.start()
        }, 300)
      }
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a")
      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick),
      )
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done()
        if (timer != null) {
          clearTimeout(timer)
        }
        return target.apply(thisArg, argArray)
      },
    })

    return () => {
      if (timer != null) {
        clearTimeout(timer)
      }
    }
  })

  return null
}
