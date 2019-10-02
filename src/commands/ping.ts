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
    const ping_embed = new discord.RichEmbed()
      .setColor(0x36393f)
      .setTitle(`🛈️️ Pong!`)
      .setDescription(
        `Average heartbeat ping of the websocket is: ${Math.round(
          GlobalVars.bot.ping
        )}ms`
      );

    message.channel.send(ping_embed);
  }
}
