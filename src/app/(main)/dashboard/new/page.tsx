"use client"

import React from "react"
import * as Form from "@radix-ui/react-form"
import TextareaAutosize from "react-textarea-autosize"

import SectionCard from "@/beta/view/component/SectionCard"

const NewProgramPage = () => {
  return (
    <div className="mx-auto w-[600px] max-w-full px-8 pt-12">
      <SectionCard className="">
        <h1 className="text-xl font-bold text-slate-600">新しいプログラム</h1>
        <Form.Root className="mt-8 space-y-8">
          <Form.Field name="title">
            <Form.Label className="text-sm font-bold text-slate-600">
              プログラム名
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg border-slate-200 text-slate-600 focus:outline-none"
                placeholder="ハローワールド"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="descrition">
            <Form.Label className="text-sm font-bold text-slate-600">
              プログラムの説明
            </Form.Label>
            <Form.Control asChild>
              <TextareaAutosize
                className="w-full px-4 py-2 mt-2 border rounded-lg border-slate-200 text-slate-600 focus:outline-none"
                placeholder="プログラムの説明"
                minRows={3}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button className="flex w-full items-center justify-center space-x-2 rounded bg-orange-400 px-4 py-2 font-bold text-white transition hover:bg-orange-500 hover:shadow active:translate-y-0.5 active:shadow-none">
              作成する
            </button>
          </Form.Submit>
        </Form.Root>
      </SectionCard>
    </div>
  )
}

export default NewProgramPage
