import React from "react"

export type EditableTextProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className="relative px-2 py-1 transition-all border border-transparent rounded-lg group focus-within:border-slate-400 focus-within:px-4">
      <div className="relative shrink-0">
        <div>{value}</div>
        <input
          type="text"
          className="absolute inset-0 focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="absolute px-2 py-1 ml-2 text-xs font-bold -translate-y-1/2 rounded-lg opacity-0 left-full top-1/2 bg-slate-100 text-slate-500 group-focus-within:block group-focus-within:opacity-100">
        Enter
      </div>
    </div>
  )
}

export default EditableText
