import { useRecoilValue } from "recoil"

import { selectedElementIdsState } from "../services/select/selectedElement"
import { edgesState } from "../services/atoms/edge"

const RecoilDebugPanel = () => {
  const selectedElements = useRecoilValue(selectedElementIdsState)
  const edges = useRecoilValue(edgesState)

  return (
    <div className="pointer-events-none fixed right-0 top-0 max-w-[400px] p-4">
      <h2>SelectedElements</h2>
      <div>{JSON.stringify(selectedElements)}</div>
      <h2>Edges</h2>
      <div>{JSON.stringify(edges)}</div>
    </div>
  )
}

export default RecoilDebugPanel
