export type ProgramSchema = {
  id: string
  title: string
  createdBy: {
    id: string
    name: string
  }
  description: string
  instruction: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
