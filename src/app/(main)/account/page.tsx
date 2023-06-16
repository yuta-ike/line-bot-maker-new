"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FiEdit, FiLoader } from "react-icons/fi"
import classNames from "classnames"

import { getAccount } from "@/lib/appwrite/core"
import SectionCard from "@/beta/view/component/SectionCard"
import { useUser } from "@/lib/appwrite/auth"

import { useUpdateName } from "./_hook/useUpdateName"

const AccountPage = () => {
  const { data: user, mutate } = useUser()
  const router = useRouter()
  const [edit, setEdit] = useState(false)

  const { trigger: updateName, isMutating } = useUpdateName()

  const handleSaveName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as {
      name: string
    }

    // const account = getAccount()
    // await account.updateName(data["name"] as string)
    await updateName(data)
    setEdit(false)

    // toast("Name updated")

    mutate()
  }

  const handleLogOut = async () => {
    const account = getAccount()
    await account.deleteSession("current")
    router.push("/login")
  }

  return (
    <div className="mx-auto w-[640px] p-12">
      <SectionCard className="flex max-w-full flex-col gap-y-8">
        <h2 className="text-2xl font-bold">Account</h2>
        <form onSubmit={handleSaveName}>
          <label className="text-sm font-bold text-slate-600">User name</label>
          <div className="mt-2 flex items-center gap-x-4">
            <input
              name="name"
              defaultValue={user?.name}
              className={classNames(
                "w-full grow rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none",
                edit ? "disabled:bg-slate-100" : "disabled:bg-slate-50",
              )}
              placeholder="password"
              disabled={!edit || isMutating}
            />
            {edit ? (
              <button
                key="save"
                aria-label="Save Name"
                aria-pressed={edit}
                className={classNames(
                  "max-auto flex w-max shrink-0 items-center space-x-2 rounded-lg p-3 text-sm font-bold text-green-600 transition",
                  isMutating
                    ? "cursor-not-allowed"
                    : "hover:bg-slate-100 active:translate-y-0.5",
                )}
              >
                {isMutating ? (
                  <FiLoader className="animate-spin-slow" />
                ) : (
                  "Save"
                )}
              </button>
            ) : (
              <button
                key="edit"
                type="button"
                aria-label="Edit Name"
                aria-pressed={edit}
                className="max-auto flex w-max shrink-0 items-center space-x-2 rounded-lg p-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 active:translate-y-0.5"
                onClick={() => setEdit((prev) => !prev)}
              >
                <FiEdit />
              </button>
            )}
          </div>
        </form>
        <button
          className="max-auto flex w-max items-center space-x-2 rounded-lg border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-400 active:translate-y-0.5"
          onClick={handleLogOut}
        >
          Login out
        </button>
      </SectionCard>
    </div>
  )
}

export default AccountPage
