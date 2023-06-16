"use client"

import * as Form from "@radix-ui/react-form"
import { ID } from "appwrite"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { getAccount } from "@/lib/appwrite/core"

const LoginWithEmailPage = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))

    const account = getAccount()
    await account.create(
      ID.unique(),
      data["email"] as string,
      data["password"] as string,
    )
    await account.createEmailSession(
      data["email"] as string,
      data["password"] as string,
    )
    await account.updateName(data["name"] as string)
    router.push("/dashboard")
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget))

    const account = getAccount()
    await account.createEmailSession(
      data["email"] as string,
      data["password"] as string,
    )
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col space-y-4">
      {isLogin ? (
        <Form.Root className="space-y-8" onSubmit={handleLogIn} key="login">
          <Form.Field name="email">
            <Form.Label className="text-sm font-bold text-slate-600">
              Email
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="example@example.com"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="password">
            <Form.Label className="text-sm font-bold text-slate-600">
              Password
            </Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="password"
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit className="w-full rounded-lg border border-slate-200 bg-slate-600 px-6 py-3 text-center font-bold text-white shadow transition hover:shadow-xl active:translate-y-0.5 active:shadow-none">
            Login
          </Form.Submit>
        </Form.Root>
      ) : (
        <Form.Root className="space-y-8" onSubmit={handleSignUp} key="signup">
          <Form.Field name="name">
            <Form.Label className="text-sm font-bold text-slate-600">
              User name
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="User name"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="email">
            <Form.Label className="text-sm font-bold text-slate-600">
              Email
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="example@example.com"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="password">
            <Form.Label className="text-sm font-bold text-slate-600">
              Password
            </Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-600 focus:outline-none disabled:bg-slate-100"
                placeholder="password"
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit className="w-full rounded-lg border border-slate-200 bg-slate-600 px-6 py-3 text-center font-bold text-white shadow transition hover:shadow-xl active:translate-y-0.5 active:shadow-none">
            Sign Up
          </Form.Submit>
        </Form.Root>
      )}
      <div className="mt-8 flex w-full justify-center">
        {isLogin ? (
          <button
            className="text-blue-500 underline"
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        ) : (
          <button
            className="text-blue-500 underline"
            onClick={() => setIsLogin(true)}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  )
}

export default LoginWithEmailPage
