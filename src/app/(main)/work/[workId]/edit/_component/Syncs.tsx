import React from "react"
import { RecoilSync } from "recoil-sync"

import { ProgramDetailSchema } from "@/repo/type"

export type SyncsProps = {
  initData: ProgramDetailSchema
  children: React.ReactNode
}

const Syncs = ({ children, initData }: SyncsProps) => {
  return (
    <RecoilSync
      storeKey="nodeIdsState"
      read={() => new Set(initData.program.nodes.map(({ node }) => node.id))}
    >
      <RecoilSync
        storeKey="edgeIdsState"
        read={() => new Set(initData.program.edges.map(({ id }) => id))}
      >
        <RecoilSync
          storeKey="nodeState"
          read={(nodeId: string) =>
            initData.program.nodes.find(({ node }) => node.id === nodeId)?.node
          }
        >
          <RecoilSync
            storeKey="nodeRectState"
            read={(nodeId: string) =>
              initData.program.nodes.find(({ node }) => node.id === nodeId)
                ?.rect
            }
          >
            <RecoilSync
              storeKey="edgeState"
              read={(edgeId: string) =>
                initData.program.edges.find(({ id }) => id === edgeId)
              }
            >
              <RecoilSync
                storeKey="chatHistoryState"
                read={() => initData.debugState.chatHistory}
              >
                <RecoilSync
                  storeKey="simulatorInputState"
                  read={() => initData.debugState.simulatorInput}
                >
                  {children}
                </RecoilSync>
              </RecoilSync>
            </RecoilSync>
          </RecoilSync>
        </RecoilSync>
      </RecoilSync>
    </RecoilSync>
  )
}

export default Syncs
