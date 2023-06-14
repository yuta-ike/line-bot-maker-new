const sdk = require("node-appwrite")
const { Client, Intents, MessageEmbed } = require("discord.js")

let client = null

module.exports = async function (req, res) {
  if (client) {
    res.send("Already initialized")
    return
  }
  initClient(req)
  res.send("Initialized")
}

function initClient(req) {
  client = new Client({
    intents: ["Guilds", "GuildMessages"],
  })

  client.once("ready", () => {
    console.log("Ready!")
  })

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return

    let command = message.content.split(" ")[0]
    let params = message.content.split(" ").slice(1)

    switch (command) {
      case "hello":
        message.channel.send("world!")
        break
    }
  })

  client.login(req.env["DISCORD_TOKEN"])
}
