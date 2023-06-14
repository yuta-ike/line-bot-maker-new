import dynamic from "next/dynamic"

import Providers from "@/provider/Providers"

import "./global.css"

const ProgressBar = dynamic(
  () => import("@/beta/view/component/ProgressBar/ProgressBar"),
  {
    ssr: false,
  },
)

export type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="ja">
      <body>
        <ProgressBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default Layout
