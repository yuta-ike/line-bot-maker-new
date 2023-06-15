import format from "date-fns/format"

export type MagicVariable = LocalMagicVariable | GlobalMagicVariable

export type LocalMagicVariable = {
  type: `LOCAL:${string}`
  label: string
}

export type GlobalMagicVariable = {
  type:
    | GeneralMagicVariableType
    | LbmMagicVariableType
    | LbmMetaMagicVariableType
    | ProviderMagicVariableType

  label: string
}

export type GeneralMagicVariableType = "TIME:TODAY" | "TIME:NOW"

export type LbmMagicVariableType =
  | "LBM:DEVELOPER_DISPLAY_NAME"
  | "LBM:ORIGINAL_INPUT"

export type LbmMetaMagicVariableType = "LBM_META:APP_VERSION"

export type ProviderMagicVariableType =
  | "LINE:DISPLAY_NAME"
  | "LINE:STATUS_MESSAGE"

export type InterpreterContext = {
  bot: {
    developer: {
      name: string
    }
    title: string
  }
  user: {
    name: string
  }
}

export const GLOBAL_MAGIC_VARIABLES: MagicVariable[] = [
  {
    type: "LBM:ORIGINAL_INPUT",
    label: "User Input",
  },
  {
    type: "TIME:TODAY",
    label: "Date",
  },
  {
    type: "TIME:NOW",
    label: "Time",
  },
  // {
  //   type: "LBM:DEVELOPER_DISPLAY_NAME",
  //   label: "Developer Name",
  // },
  // { type: "LBM_META:APP_VERSION", label: "アプリのバージョン" },
  // { type: "LINE:DISPLAY_NAME", label: "ユーザー名" },
  // { type: "LINE:STATUS_MESSAGE", label: "ステータスメッセージ" },
]

export const replaceLocalMagicVariable = (
  value: string,
  { input }: { input: string },
) => {
  if (value == null) {
    return ""
  }

  return value.replaceAll("{LOCAL:INPUT}", input)
}

export const replaceGlobalMagicVariable = (
  value: string,
  input: string,
  // context: InterpreterContext,
) => {
  if (value == null) {
    return ""
  }

  return (
    value
      .replaceAll("{TIME:TODAY}", format(new Date(), "yyyy/M/d"))
      .replaceAll("{TIME:NOW}", format(new Date(), "h:d"))
      // .replaceAll("{LBM:DEVELOPER_DISPLAY_NAME}", context.bot.developer.name)
      .replaceAll("{LBM:ORIGINAL_INPUT}", input)
      // .replaceAll("{LINE:DISPLAY_NAME}", context.user.name)
      .replaceAll("{LBM_META:APP_VERSION}", "0.0.1")
  )
}
