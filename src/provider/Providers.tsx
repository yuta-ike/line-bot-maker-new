"use client"

import React from "react"
import { RecoilRoot } from "recoil"

export type ProvidersProps = {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default Providers
