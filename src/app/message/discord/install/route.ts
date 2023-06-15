import { installGlobalCommands } from "@/utils/installDiscordCommand"

export const GET = async () => {
  try {
    await installGlobalCommands()
  } catch (e) {
    console.log(e)
  }
}
