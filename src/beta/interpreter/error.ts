export default class InterpreterError extends Error {
  public code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "InterpreterError"
    this.code = code
  }
}
