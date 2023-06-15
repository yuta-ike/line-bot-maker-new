"use client"

import React from "react"
import { useParams } from "next/navigation"
import { FiLoader } from "react-icons/fi"

import Editor from "@/beta/Editor"

import { useProgramDetail } from "./_hooks/useProgramDetail"
import Syncs from "./_component/Syncs"

const EditPage = () => {
  const params = useParams()
  const workId = params["workId"]

  const { data } = useProgramDetail(workId ?? null)

  if (workId == null) {
    return <div>404</div>
  }

  if (data == null) {
    return (
      <div
        className="fixed inset-0 grid place-items-center text-4xl text-slate-400"
        style={{
          backgroundColor: "#fff",
          backgroundImage: "radial-gradient(#E6E6E6 10%, transparent 10%)",
          backgroundSize: "16px 16px",
          backgroundPosition: `0px 0px, 16px 16px`,
          willChange: "transform",
        }}
      >
        <FiLoader className="animate-spin-slow" />
      </div>
    )
  }

  return (
    <Syncs initData={data}>
      <Editor initProgram={data} />
    </Syncs>
  )
}

export default EditPage
