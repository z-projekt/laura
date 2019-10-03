import * as discord from "discord.js";

import { ICommand } from "../definitions";
import { GlobalVars } from "../global_vars";

export default class PingCommand implements ICommand {
  constructor() {
    this.description = "Pong!";
    this.syntax = "ping";
    this.args = "none";
  }

  description: string;
  syntax: string;
  args: string;

  action(message: discord.Message, args: string[]) {
    message.channel.send("Pinging...").then(_message => {
      const ping_embed: discord.RichEmbed = new discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(`🛈️️ Pong!`)
        .setDescription(
          `Average heartbeat ping of the websocket is: ${Math.round(
            GlobalVars.bot.ping
          )}ms
          Response took: ${Math.round(
            // @ts-ignore
            _message.createdTimestamp - message.createdTimestamp
          )}ms.`
        );
      // @ts-ignore
      _message.edit(ping_embed);
    });
  }
}
