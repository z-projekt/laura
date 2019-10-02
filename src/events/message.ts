import { IEvent } from "../definitions";
import { GlobalVars } from "../global_vars";

export default class MessageEvent implements IEvent {
  constructor() {
    this.name = "message";
  }

  name: string;

  override(client: any, message: any): void {
    if (message.author.bot) return;

    if (
      GlobalVars.bot
        .guilds.get(message.guild.id)
        .members.get(message.author.id)
        .roles.get(GlobalVars.config.permitted_rank_id) == undefined
    )
      return;

    const args = message.content
      .substring(GlobalVars.config.prefix.length)
      .split(" ");

    for (const command of GlobalVars.commands) {
      if (command.syntax == args[0]) {
        command.action(message, args);
      }
    }
  }
}
