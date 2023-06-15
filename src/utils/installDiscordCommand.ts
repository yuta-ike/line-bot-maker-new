export async function installGlobalCommands() {
  // API endpoint to overwrite global commands
  const endpoint = `applications/1118731010935369818/commands`
  console.log("HELLO!!!")

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    // await DiscordRequest(endpoint, { method: "PUT", body: commands })
    const res = await fetch("https://discord.com/api/v10/" + endpoint, {
      headers: {
        Authorization: `Bot MTExODczMTAxMDkzNTM2OTgxOA.GgIF2K.NM2aouwpzL-WHluueLOqHEzzKUmc2DY4jYwFAs`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify([
        {
          name: "text",
          description: "Send message to bot",
          type: 1,
        },
        {
          name: "challenge",
          description: "Challenge to a match of rock paper scissors",
          options: [
            {
              type: 3,
              name: "object",
              description: "Pick your object",
              required: true,
              choices: [
                {
                  name: "hakata",
                  value: "HAKATA",
                },
                {
                  name: "nagoya",
                  value: "NAGOYA",
                },
              ],
            },
          ],
          type: 1,
        },
      ]),
      method: "PUT",
    })
    const json = await res.json()
    console.log(json)
    console.log(json["errors"])
  } catch (err) {
    console.error(err)
  }
}
