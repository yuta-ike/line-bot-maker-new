import React from "react"

export type EditableTextProps = {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  className?: string
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  onBlur,
  className,
}) => {
  return (
    <div className="group relative rounded-lg border border-transparent px-2 py-1 transition-all focus-within:border-slate-400 focus-within:px-4">
      <div className="relative shrink-0">
        <div>{value}</div>
        <input
          type="text"
          className="absolute inset-0 focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 opacity-0 group-focus-within:block group-focus-within:opacity-100">
        Enter
      </div>
    </div>
  )
}

export default EditableText
