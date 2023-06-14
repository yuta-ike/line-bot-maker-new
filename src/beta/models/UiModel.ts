export type UiModel = {
  color: string
  accentColor: string
  struct: UiStruct
}

export type UiStruct =
  | {
      type: "flex-row" | "flex-col"
      children: {
        fillType: "no-shrik" | "grow"
        child: UiStruct
      }[]
    }
  | {
      type: "text"
      typo: "body" | "title"
      text: string
    }
  | ({
      type: "icon"
    } & (
      | {
          iconType: "text"
          text: string
        }
      | {
          iconType: "icon"
          iconName: string
        }
    ))
  | {
      type: "input"
      id: string
      placeholder: string
    }
