"use client"

import classNames from "classnames"

import NodeBlock from "@/beta/components/NodeBlock/NodeBlock"
import EdgeLine from "@/beta/components/EdgeLine/EdgeLine"
import { useNodeIds } from "@/beta/services/node/node"
import { useEdgeIds } from "@/beta/services/atoms/edge"
import Ground from "@/beta/components/Ground/Ground"
import TmpEdgeLine from "@/beta/components/EdgeLine/TmpEdgeLine"
import CaptureUnselectEvent from "@/beta/services/select/CaptureUnselectEvent"
import SidePane from "@/beta/components/SidePane/SidePane"
import { ProgramDetailSchema } from "@/repo/type"

import CanvasControl from "./components/CanvasControl/CanvasControl"
import SelectedAreaRect from "./components/Ground/SelectedAreaRect/SelectedAreaRect"
import CaptureKeyboardEvent from "./components/KeyboardShortcut/CaptureKeyboardEvent"
import SubPane from "./components/SubPane/SubPane"
import EditorHeader from "./components/EditorHeader/EditorHeader"
import { useIsOpenEmulator } from "./components/Ground/emulator"
import SidePanel from "./components/SidePanel/SidePanel"

export type EditorProps = {
  initProgram: ProgramDetailSchema
}

const Editor = ({ initProgram }: EditorProps) => {
  const nodeIds = useNodeIds()
  const edgeIds = useEdgeIds()

  const [isOpenEmulator] = useIsOpenEmulator()

  return (
    <>
      <Ground
        className={classNames(
          "fixed inset-0 transition-[width]",
          isOpenEmulator ? "w-[calc(100%-440px)]" : "right-0 w-full",
        )}
      >
        <SelectedAreaRect />

        {nodeIds.map((nodeId) => (
          <NodeBlock key={nodeId} id={nodeId} />
        ))}

        {edgeIds.map((edgeId) => (
          <EdgeLine key={edgeId} id={edgeId} />
        ))}

        <TmpEdgeLine />
        <SidePane />
        <SubPane />
        <CanvasControl />
      </Ground>
      <SidePanel />
      <EditorHeader
        initTitle={initProgram.title}
        initIsPublic={initProgram.isPublic}
        initInstruction={initProgram.instruction}
        initExample={initProgram.example}
      />

      {/* Event Capture */}
      <CaptureUnselectEvent />
      <CaptureKeyboardEvent />
    </>
  )
}

export default Editor
