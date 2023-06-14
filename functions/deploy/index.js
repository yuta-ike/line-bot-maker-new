"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sdk = require("node-appwrite");
const { Client, Intents, MessageEmbed } = require("discord.js");
let client = null;
module.exports = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            res.send("Already initialized");
            return;
        }
        initClient(req);
        res.send("Initialized");
    });
};
function initClient(req) {
    client = new Client({
        intents: ["Guilds", "GuildMessages"],
    });
    // @ts-ignore
    client.once("ready", () => {
        console.log("Ready!");
    });
    // @ts-ignore
    client.on("messageCreate", (message) => __awaiter(this, void 0, void 0, function* () {
        if (message.author.bot)
            return;
        let command = message.content.split(" ")[0];
        let params = message.content.split(" ").slice(1);
        switch (command) {
            case "hello":
                message.channel.send("world!");
                break;
        }
    }));
    // @ts-ignore
    client.login(req.env["DISCORD_TOKEN"]);
}
