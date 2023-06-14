import { Environment } from "../interpreter"
import { Mock } from "../services/mock/mock"

import { replaceLocalMagicVariable } from "./MagicVariables"

export type RunResult =
  | {
      done: false
      result: { socketId: string; value: string }
    }
  | {
      done: true
      result: {
        socketId: string | null // string の場合は再開可能
        value: string
      }
    }

export type NodeLogic = Record<
  string,
  {
    run: (
      value: string,
      extraProps: Record<string, unknown>,
      environment: Environment,
      mock?: Mock,
    ) => Promise<RunResult> | RunResult
  }
>

export const NODE_LOGIC: NodeLogic = {
  "standard-input": {
    run: (value) => {
      return {
        done: false,
        result: { socketId: "output", value },
      }
    },
  },
  "string-equal": {
    run: (value, extraProps) => {
      if (
        value ===
        replaceLocalMagicVariable(extraProps["target"] as string, {
          input: value,
        })
      ) {
        return {
          done: false,
          result: { socketId: "true", value },
        }
      } else {
        return {
          done: false,
          result: { socketId: "false", value },
        }
      }
    },
  },
  "string-includes": {
    run: (value, extraProps) => {
      if (
        value.includes(
          replaceLocalMagicVariable(extraProps["target"] as string, {
            input: value,
          }),
        )
      ) {
        return {
          done: false,
          result: { socketId: "true", value },
        }
      } else {
        return {
          done: false,
          result: { socketId: "false", value },
        }
      }
    },
  },
  random: {
    run: (value, _, __, mock) => {
      if (mock) {
        return {
          done: false,
          result: { socketId: mock.socketId, value },
        }
      }
      if (Math.random() < 0.5) {
        return {
          done: false,
          result: { socketId: "a", value },
        }
      } else {
        return {
          done: false,
          result: { socketId: "b", value },
        }
      }
    },
  },
  "ask-text": {
    run: (value, extraProps, environment, mock) => {
      // エミュレータではモックを利用しない除外
      if (environment.environment !== "emulator" && mock) {
        return {
          done: false,
          result: {
            socketId: "output",
            value: replaceLocalMagicVariable(mock.value, {
              input: value,
            }),
          },
        }
      }

      return {
        done: true,
        result: {
          socketId: "output",
          value: extraProps["question"] as string,
        },
      }
    },
  },
  "text-output": {
    run: (value, extraProps) => {
      return {
        done: true,
        result: {
          socketId: null,
          value: replaceLocalMagicVariable(extraProps["message"] as string, {
            input: value,
          }),
        },
      }
    },
  },
}

// 簡易実装
