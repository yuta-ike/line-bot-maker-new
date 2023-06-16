import React from "react"

export type OverlayProps = {
  show: boolean
}

const Overlay = ({ show }: OverlayProps) => {
  return (
    <div
      data-show={show}
      className="pointer-events-none fixed inset-0 bg-white/30 opacity-0 backdrop-blur-sm transition-opacity data-[show='true']:opacity-100"
    />
  )
}

export default Overlay
