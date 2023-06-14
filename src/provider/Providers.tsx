"use client"

import React from "react"
import { RecoilRoot } from "recoil"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export type ProvidersProps = {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Providers
