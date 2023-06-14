import { useEffect, useState } from "react"
import { Snapshot, useGotoRecoilSnapshot, useRecoilSnapshot } from "recoil"

const TimeTravelObserver: React.FC = () => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])

  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    if (snapshots.every((s) => s.getID() !== snapshot.getID())) {
      setSnapshots([...snapshots, snapshot])
    }
  }, [snapshot, snapshots])

  const gotoSnapshot = useGotoRecoilSnapshot()

  return (
    <ol className="absolute">
      {snapshots.map((snapshot, i) => (
        <li key={i}>
          Snapshot {i}
          <button onClick={() => gotoSnapshot(snapshot)}>Restore</button>
        </li>
      ))}
    </ol>
  )
}

export default TimeTravelObserver
