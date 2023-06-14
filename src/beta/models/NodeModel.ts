import { LocalMagicVariable } from "./MagicVariables"
import { UiModel } from "./UiModel"

export type DataType =
  | "string"
  | "number"
  | "boolean"
  | "any"
  | { union: DataType[] }

export type ExtraProp = {
  id: string
  label: string
} & (
  | {
      type: "string"
      placeholder: string
      localMagicVariables: LocalMagicVariable[]
    }
  | {
      type: "select"
      options: {
        id: string
        label: string
      }[]
      placeholder: string
    }
)

// magicVariables

export type NodeModel = {
  id: string
  meta: {
    name: string
    description: string
  }
  sockets: {
    input: readonly {
      id: string
      type: DataType
      label: string
    }[]
    output: readonly {
      id: string
      type: DataType
      label: string
    }[]
  }
  body: UiModel
  mock?: {
    // Node の行き先を mock するか、結果を mock するか
    type: "value-and-socket" | "socket"
    disableWhenEmulator?: boolean
  }
  extraProps?: ExtraProp[]
}

export const StandardInputNodeModel = {
  id: "standard-input",
  meta: {
    name: "入力",
    description:
      "ユーザーの入力を受け付けるブロックです。入力があった場合、inputに移動します。",
  },
  body: {
    color: "#BBB4A8",
    accentColor: "#777777",
    struct: {
      type: "flex-row",
      children: [
        {
          fillType: "no-shrik",
          child: {
            type: "icon",
            iconType: "icon",
            iconName: "chat",
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "text",
            typo: "title",
            text: "入力",
          },
        },
      ],
    },
  },
  sockets: {
    input: [],
    output: [
      {
        id: "output",
        type: "string",
        label: "input",
      },
    ],
  },
  extraProps: [],
} satisfies NodeModel

export const StringEqualNodeModel: NodeModel = {
  id: "string-equal",
  meta: {
    name: "文字列比較",
    description:
      "文字列の比較を行うブロックです。入力と比較先が一致する場合にtrue、一致しない場合にfalseに移動します。",
  },
  body: {
    color: "#7BABE4",
    accentColor: "#4876AC",
    struct: {
      type: "flex-col",
      children: [
        {
          fillType: "no-shrik",
          child: {
            type: "icon",
            iconType: "text",
            text: "==",
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "flex-row",
            children: [
              {
                fillType: "grow",
                child: {
                  type: "input",
                  id: "target",
                  placeholder: "こんにちは",
                },
              },
              {
                fillType: "no-shrik",
                child: {
                  type: "text",
                  typo: "body",
                  text: "と同じ",
                },
              },
            ],
          },
        },
      ],
    },
  },
  sockets: {
    input: [
      {
        id: "input",
        type: "string",
        label: "input",
      },
    ],
    output: [
      {
        id: "true",
        type: "string",
        label: "true",
      },
      {
        id: "false",
        type: "string",
        label: "false",
      },
    ],
  },
  extraProps: [
    {
      id: "target",
      type: "string",
      label: "比較先",
      placeholder: "こんにちは",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "ノードの入力",
        },
      ],
    },
  ],
} satisfies NodeModel

export const StringIncludesNodeModel: NodeModel = {
  id: "string-includes",
  meta: {
    name: "文字列比較（含む）",
    description:
      "文字列が含まれるかを判定するブロックです。比較先の文字列が入力に含まれる場合に true、そうでない場合に false を返します。",
  },
  body: {
    color: "#7BABE4",
    accentColor: "#4876AC",
    struct: {
      type: "flex-col",
      children: [
        {
          fillType: "no-shrik",
          child: {
            type: "icon",
            iconType: "text",
            text: "INCLUDE",
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "flex-row",
            children: [
              {
                fillType: "grow",
                child: {
                  type: "input",
                  id: "target",
                  placeholder: "こんにちは",
                },
              },
              {
                fillType: "no-shrik",
                child: {
                  type: "text",
                  typo: "body",
                  text: "を含む",
                },
              },
            ],
          },
        },
      ],
    },
  },
  sockets: {
    input: [
      {
        id: "input",
        type: "string",
        label: "input",
      },
    ],
    output: [
      {
        id: "true",
        type: "string",
        label: "true",
      },
      {
        id: "false",
        type: "string",
        label: "false",
      },
    ],
  },
  extraProps: [
    {
      id: "target",
      type: "string",
      label: "比較先",
      placeholder: "こんにちは",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "ノードの入力",
        },
      ],
    },
  ],
} satisfies NodeModel

export const RandomNodeModel: NodeModel = {
  id: "random",
  meta: {
    name: "ランダム",
    description:
      "A と B をランダムに選択するブロックです。50% の確率で A を、50% の確率で B を選択します。",
  },
  body: {
    color: "#f36c6c",
    accentColor: "#c23939",
    struct: {
      type: "icon",
      iconType: "text",
      text: "ランダム",
    },
  },
  sockets: {
    input: [
      {
        id: "input",
        type: "string",
        label: "input",
      },
    ],
    output: [
      {
        id: "a",
        type: "string",
        label: "A",
      },
      {
        id: "b",
        type: "string",
        label: "B",
      },
    ],
  },
  mock: {
    type: "socket",
  },
} satisfies NodeModel

export const AskTextNodeModel: NodeModel = {
  id: "ask-text",
  meta: {
    name: "ユーザーに聞く",
    description: "ユーザーに質問メッセージを送ります",
  },
  body: {
    color: "#7BABE4",
    accentColor: "#4876AC",
    struct: {
      type: "flex-col",
      children: [
        {
          fillType: "no-shrik",
          child: {
            type: "icon",
            iconType: "text",
            text: "QUESTION",
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "flex-row",
            children: [
              {
                fillType: "grow",
                child: {
                  type: "input",
                  id: "question",
                  placeholder: "質問内容",
                },
              },
            ],
          },
        },
      ],
    },
  },
  sockets: {
    input: [
      {
        id: "input",
        type: "string",
        label: "input",
      },
    ],
    output: [
      {
        id: "output",
        type: "string",
        label: "回答",
      },
    ],
  },
  extraProps: [
    {
      id: "question",
      type: "string",
      label: "質問内容",
      placeholder: "質問内容",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "ノードの入力",
        },
      ],
    },
  ],
  mock: {
    type: "value-and-socket",
    disableWhenEmulator: true,
  },
} satisfies NodeModel

export const TextOutputNodeModel: NodeModel = {
  id: "text-output",
  meta: {
    name: "テキスト出力",
    description:
      "テキストを出力するノードです。outputに送られた内容が出力されます。",
  },
  body: {
    color: "#94B484",
    accentColor: "#5C7A4B",
    struct: {
      type: "flex-col",
      children: [
        {
          fillType: "no-shrik",
          child: {
            type: "flex-row",
            children: [
              {
                fillType: "no-shrik",
                child: {
                  type: "icon",
                  iconType: "icon",
                  iconName: "chat",
                },
              },
              {
                fillType: "no-shrik",
                child: {
                  type: "text",
                  typo: "title",
                  text: "出力",
                },
              },
            ],
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "input",
            id: "message",
            placeholder: "こんにちは！",
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "text",
            typo: "body",
            text: "と出力",
          },
        },
      ],
    },
  },
  sockets: {
    input: [
      {
        id: "input",
        type: "string",
        label: "output",
      },
    ],
    output: [],
  },
  extraProps: [
    {
      id: "message",
      type: "string",
      label: "出力内容",
      placeholder: "こんにちは",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "ノードの入力",
        },
      ],
    },
  ],
}
