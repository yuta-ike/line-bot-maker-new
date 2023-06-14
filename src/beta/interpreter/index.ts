import { replaceGlobalMagicVariable } from "../models/MagicVariables"
import { NODE_LOGIC } from "../models/NodeLogic"
import { Program } from "../models/Program"
import { Mock } from "../services/mock/mock"

import InterpreterError from "./error"

export type Stacktrace = ({
  nodeId: string
} & (
  | {
      type: "next"
      socketId: string
      value: string
    }
  | {
      type: "failure"
      error: Error
    }
  | {
      type: "success"
      value: string
    }
))[]

export type InterpreterResult =
  | {
      type: "success"
      data: string
      resumeId: string | null
    }
  | {
      type: "failure"
      error: Error
    }

export type Environment = {
  environment: "emulator" | "test" | "debugger"
}

export type InterpreterOutput = {
  result: InterpreterResult
  stacktrace: Stacktrace
}

class Interpreter {
  private program: Program
  private stacktrace: Stacktrace = []
  private environment: Environment
  private mocks: (Mock & { nodeId: string })[]
  private input?: string
  // private context: InterpreterContext

  constructor(
    program: Program,
    environment: Environment,
    mocks: (Mock & { nodeId: string })[] = [],
    // context: InterpreterContext,
  ) {
    this.program = program
    this.environment = environment
    this.mocks = mocks
    // this.context = context
  }

  public async run(
    input: string,
    _startNodeId?: string,
  ): Promise<InterpreterOutput> {
    try {
      this.input = input
      const startNodeId = _startNodeId ?? this.findStartNode().id
      const result = await this.runStep(input, startNodeId)
      return { result, stacktrace: this.stacktrace }
    } catch (e: unknown) {
      return {
        result: {
          type: "failure",
          error: e as Error,
        },
        stacktrace: [],
      }
    }
  }

  public async runStep(
    value: string,
    nodeId: string,
  ): Promise<InterpreterResult> {
    try {
      const node = this.findNodeById(nodeId)

      const logic = NODE_LOGIC[node.modelId]

      if (logic == null) {
        throw new Error("Unreachable")
      }

      const mock = this.mocks.find((mock) => mock.nodeId === node.id)

      const result = await logic.run(
        value,
        node.extraProps,
        this.environment,
        mock,
      )

      const resultValue = replaceGlobalMagicVariable(
        result.result.value,
        this.input ?? "",
        // this.context,
      )

      if (result.done) {
        const nextNode =
          result.result.socketId == null
            ? null
            : this.findEdgeFrom(node.id, result.result.socketId).to

        this.stacktrace.push({
          type: "success",
          nodeId,
          value: resultValue,
        })
        return {
          type: "success",
          data: resultValue,
          resumeId: nextNode?.id ?? null,
        }
      }

      const nextNode = this.findEdgeFrom(node.id, result.result.socketId).to

      const res = this.runStep(resultValue, nextNode.id)

      this.stacktrace.push({
        type: "next",
        nodeId,
        socketId: result.result.socketId,
        value: resultValue,
      })

      return res
    } catch (e) {
      this.stacktrace.push({
        type: "failure",
        nodeId,
        error: e as Error,
      })

      return {
        type: "failure",
        error: e as Error,
      }
    }
  }

  // Utils
  private findStartNode() {
    const startNodes = this.program.nodes.filter(
      (node) => node.modelId === "standard-input",
    )
    const startNode = startNodes[0]

    if (startNode == null) {
      throw new InterpreterError(
        "START_NODE_NOT_FOUND",
        "入力ノードが見つかりません",
      )
    }

    if (2 <= startNodes.length) {
      throw new InterpreterError(
        "MULTI_START_NODES",
        "入力ノードが複数あります",
      )
    }
    return startNode
  }

  private findNodeById(id: string) {
    const node = this.program.nodes.find((node) => node.id === id)
    if (node == null) {
      throw new Error("Node not found")
    }
    return node
  }

  public findEdgeFrom(nodeId: string, socketId?: string) {
    const edge = this.program.edges.find(
      (edge) =>
        edge.from.id === nodeId &&
        (socketId == null || edge.from.socketId === socketId),
    )

    if (edge == null) {
      throw new Error("Node not found")
    }

    return edge
  }
}

type Config = {
  mocks?: (Mock & { nodeId: string })[]
  // context: InterpreterContext
} & (
  | {
      // When start
      startNodeId?: string
      resumeNodeId?: undefined
    }
  | {
      // When resume
      startNodeId?: undefined
      resumeNodeId: string
      // TODO: context の引き継ぎ
    }
)

export const runInterpreter = async (
  input: string,
  { nodes, edges }: Program,
  environment: Environment,
  { startNodeId, mocks }: Config,
) => {
  const interpreter = new Interpreter(
    { nodes, edges },
    environment,
    mocks ?? [] /*context*/,
  )
  return interpreter.run(input, startNodeId)
}
