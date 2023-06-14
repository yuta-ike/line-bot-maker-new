import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10)

export const genId = () => nanoid(8)
