"use client"

import classNames from "classnames"
import React, { useRef, useState } from "react"
import {
  FiChevronLeft,
  FiImage,
  FiRotateCw,
  FiSend,
  FiSmile,
} from "react-icons/fi"
import TextareaAutosize from "react-textarea-autosize"
import format from "date-fns/format"
import axios from "axios"
import { useParams } from "next/navigation"
import useSWR from "swr"
import Link from "next/link"

import Tooltip from "@/beta/view/atoms/Tooltop"
import { ChatItem } from "@/beta/components/SidePanel/Emulator/chatHistory"
import { getProgram } from "@/repo/getProgram"

const ChatPage = () => {
  const params = useParams()
  const chatId = params["chatId"] as string

  const { data: program, isLoading } = useSWR(
    [chatId, "fetchProgram"],
    ([chatId]) => getProgram(chatId),
  )

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [chatHistory, setChatHistory] = useState<ChatItem[]>([])
  const resumeIdRef = useRef<string | null>(null)

  const clearChat = () => {
    setChatHistory([])
    setValue("")
    resumeIdRef.current = null
  }

  // Simulator input
  const [value, setValue] = useState("")

  const setPreviousInput = () => {
    const latesChatItem = chatHistory.findLast((item) => item.sender === "user")
    if (latesChatItem == null) {
      return
    }
    setValue(latesChatItem.body)
  }

  const handleSubmit = async () => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", body: value, status: "normal", createdAt: new Date() },
    ])
    const resumeId = resumeIdRef.current

    try {
      const res = await axios.post(`/api/message`, {
        id: chatId,
        input: value,
        ...(resumeId != null
          ? {
              resumeId,
            }
          : {}),
      })

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          body: res.data.data,
          status: "normal",
          createdAt: new Date(),
        },
      ])
      resumeIdRef.current = res.data.resumeId
      setValue("")
    } catch (e) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          body: "Error...",
          status: "error",
          createdAt: new Date(),
        },
      ])
    }
  }

  return (
    <div className={classNames("flex h-screen flex-col bg-[#aec4ef]")}>
      <div className="flex shrink-0 items-center justify-start p-4">
        <Tooltip label="Work detail" side="bottom">
          <Link
            href={`/work/${chatId}`}
            aria-label="Work detail"
            className="mr-2 p-1.5 text-slate-800 hover:bg-slate-400/10"
            onClick={() => clearChat()}
            suppressHydrationWarning
          >
            <FiChevronLeft size={20} />
          </Link>
        </Tooltip>
        <div className="text-lg font-bold text-slate-800">
          {isLoading ? "Loading..." : program?.title ?? "Loading..."}
        </div>
        <Tooltip label="Clear history" side="bottom">
          <button
            aria-label="Clear history"
            className="ml-auto p-1 text-slate-600 hover:text-slate-800"
            onClick={() => clearChat()}
          >
            <FiRotateCw size={16} />
          </button>
        </Tooltip>
      </div>
      <div
        className="grow space-y-4 overflow-y-scroll p-2 pb-4 pr-3"
        ref={scrollRef}
      >
        {chatHistory.length === 0 && (
          <div className="mx-4 rounded-lg bg-slate-500/60 p-4 text-xs text-white">
            Send a message to verify if the program is functioning correctly.
          </div>
        )}
        {chatHistory.map(({ sender, body, createdAt, status }, i) =>
          sender === "bot" ? (
            <div
              key={`${i}:${body}`}
              className="group flex items-start space-x-2"
              data-error={status === "error"}
            >
              <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-pink-400 via-orange-400 to-yellow-500 shadow-orange-200" />
              <div className="max-w-[70%]">
                <div className="text-[10px] font-bold text-slate-700">
                  Bot Labo
                </div>
                <p
                  className={classNames(
                    "mt-1 w-max max-w-full whitespace-pre-line rounded-2xl bg-white p-2 px-4 text-sm group-data-error:bg-red-100 group-data-error:text-red-600",
                    // status === "error" ? "bg-red-100 text-red-600" : "bg-white",
                  )}
                >
                  {body}
                  {body.length === 0 && (
                    <span className="text-slate-400">{`レスポンスが空です`}</span>
                  )}
                </p>
              </div>
              <div className="ml-1 shrink-0 self-end text-[10px] text-slate-700">
                {format(createdAt, "H:mm")}
              </div>
            </div>
          ) : (
            <div
              key={`${i}:${body}`}
              className="flex items-start justify-end space-x-2"
            >
              <div className="flex max-w-[70%] items-end space-x-1">
                <div className="shrink-0 text-[10px] text-slate-700">
                  <div>Read</div>
                  <div>{format(createdAt, "H:mm")}</div>
                </div>
                <p className="mt-1 whitespace-pre-line rounded-2xl bg-[#8EE386] p-2 px-4 text-sm">
                  {body}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
      <form
        className="shrink-0 bg-white px-2 py-4"
        onSubmit={(e) => {
          e.preventDefault()
          // @ts-ignore
          handleSubmit(e.body)
        }}
        onKeyDown={(e) => {
          if (e.metaKey && e.key === "Enter") {
            handleSubmit()
          }
        }}
      >
        <div className="flex w-full items-end">
          <Tooltip label="Image">
            <div className="relative mr-2 shrink-0 cursor-pointer rounded p-2 hover:bg-slate-50">
              <FiImage className="text-slate-600" size={22} />
              <input
                type="file"
                aria-label="Send a image file"
                accept="image/*"
                className="absolute inset-0 opacity-0"
              />
            </div>
          </Tooltip>
          <div className="relative flex grow rounded-2xl bg-slate-100 pr-6">
            <TextareaAutosize
              name="body"
              minRows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Aa"
              className="-z-0 w-full resize-none rounded-l-2xl bg-slate-100 px-4 py-2 text-slate-600 focus:outline-none"
              required
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && value.length === 0) {
                  setPreviousInput()
                }
              }}
            />
            <Tooltip label="Sticker">
              <button
                className="absolute bottom-1 right-1 rounded-full p-2 hover:bg-slate-200"
                aria-label="Sned sticker"
                type="button"
              >
                <FiSmile />
              </button>
            </Tooltip>
          </div>
          <Tooltip label="Send">
            <button
              type="submit"
              aria-label="Send"
              className="ml-2 shrink-0 rounded p-2 hover:bg-blue-50"
            >
              <FiSend className="text-blue-600" size={20} />
            </button>
          </Tooltip>
        </div>
        <p className="mr-[44px] mt-2 text-end text-xs text-slate-400">
          Press <kbd>cmd</kbd> + <kbd>Enter</kbd> to send
        </p>
      </form>
    </div>
  )
}

export default ChatPage
