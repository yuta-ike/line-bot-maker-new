import { useCallback } from "react"
import { atom, useRecoilState } from "recoil"
import { syncEffect } from "recoil-sync"
import { CheckSuccess } from "@recoiljs/refine"

export type ChatItem = {
  sender: "user" | "bot"
  body: string
  createdAt: Date
  status: "normal" | "error"
}

export const chatHistoryState = atom<ChatItem[]>({
  key: "atom/chatHistory",
  default: [],
  effects: [
    syncEffect({
      storeKey: "chatHistoryState",
      refine: (value): CheckSuccess<ChatItem[]> => {
        console.log(value)
        return {
          // @ts-ignore
          value,
          type: "success",
          warnings: [],
        }
      },
    }),
  ],
})

export const useChatHistory = () => {
  const [history, setHistory] = useRecoilState(chatHistoryState)

  const addChat = useCallback(
    (item: Omit<ChatItem, "createdAt">) =>
      setHistory((history) => [...history, { ...item, createdAt: new Date() }]),
    [setHistory],
  )

  const clearChat = useCallback(() => setHistory([]), [setHistory])

  return { history, addChat, clearChat }
}
