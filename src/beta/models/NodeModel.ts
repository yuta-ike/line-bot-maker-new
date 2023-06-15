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
    name: "Input",
    description:
      'This is a block that accepts user input. If there is an input, it will transition to the "input" block.',
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
            text: "Input",
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
    name: "String Equality",
    description:
      'This is a block that performs string comparison. If the input matches the comparison target, it transitions to "true"; if there is no match, it transitions to "false".',
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
                fillType: "no-shrik",
                child: {
                  type: "text",
                  typo: "body",
                  text: "Same as",
                },
              },
              {
                fillType: "grow",
                child: {
                  type: "input",
                  id: "target",
                  placeholder: "hello",
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
      label: "target",
      placeholder: "hello",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "Node Input",
        },
      ],
    },
  ],
} satisfies NodeModel

export const StringIncludesNodeModel: NodeModel = {
  id: "string-includes",
  meta: {
    name: "String Includes",
    description:
      "This is a block that determines whether a string is present. If the comparison target string is included in the input, it returns true; otherwise, it returns false.",
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
                fillType: "no-shrik",
                child: {
                  type: "text",
                  typo: "body",
                  text: "includes",
                },
              },
              {
                fillType: "grow",
                child: {
                  type: "input",
                  id: "target",
                  placeholder: "hello",
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
      label: "target",
      placeholder: "hello",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "Node Input",
        },
      ],
    },
  ],
} satisfies NodeModel

export const RandomNodeModel: NodeModel = {
  id: "random",
  meta: {
    name: "Random",
    description:
      "This is a block that randomly selects between A and B. It has a 50% chance of choosing A and a 50% chance of choosing B.",
  },
  body: {
    color: "#f36c6c",
    accentColor: "#c23939",
    struct: {
      type: "icon",
      iconType: "text",
      text: "Random",
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
    name: "Ask User",
    description: "Sending a question message to the user.",
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
                  placeholder: "Question",
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
        label: "Answer",
      },
    ],
  },
  extraProps: [
    {
      id: "question",
      type: "string",
      label: "Question",
      placeholder: "Question",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "Node Input",
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
    name: "Text Output",
    description:
      "This is a node that outputs text. The content sent to the output will be displayed.",
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
                  text: "Output",
                },
              },
            ],
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "text",
            typo: "body",
            text: "Output",
          },
        },
        {
          fillType: "no-shrik",
          child: {
            type: "input",
            id: "message",
            placeholder: "hello!",
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
      label: "Output",
      placeholder: "hello",
      localMagicVariables: [
        {
          type: "LOCAL:INPUT",
          label: "Node Input",
        },
      ],
    },
  ],
}
