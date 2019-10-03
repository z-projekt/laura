import * as discord from "discord.js";

import { ICommand } from "../definitions";
import { GlobalVars } from "../global_vars";
import { FormattingUtils } from "../utilities/formatting_utils";

export default class InfoCommand implements ICommand {
  constructor() {
    this.description = "Gets info about [...]";
    this.syntax = "info";
    this.args = "[user/you]";
  }

  description: string;
  syntax: string;
  args: string;

  action(message: discord.Message, args: string[]) {
    if (!args[1]) return;

    const user: discord.User = args[2]
      ? message.mentions.members.first().user
      : message.author;

    let user_roles: string[] = [];

    for (const role of message.guild.members.get(user.id).roles.array())
      user_roles.push(role.name);

    const info_embed = new discord.RichEmbed();

    switch (args[1]) {
      case "user":
        info_embed
          .setColor(0x36393f)
          .setAuthor(user.tag, user.avatarURL)
          .setDescription(`Info about <@${user.id}>`)
          .setThumbnail(user.avatarURL)
          .addField(
            "Account info:",
            `Username: \`${user.username}\`
            Discriminator: \`${user.discriminator}\`
            Identifier: \`${user.id}\`
            Account type: \`${user.bot ? `Bot` : `User`}\`
            Created at: \`${user.createdAt.toUTCString()}\``,
            false
          )
          .addField(
            "Guild info:",
            `Permissions bit field: \`${message.guild.members
              .get(user.id)
              .permissions.bitfield.toString()}\`
            Joined at: \`${message.guild.members
              .get(user.id)
              .joinedAt.toUTCString()}\`
            Roles: \`${user_roles.join("`, `")}\``,
            false
          )
          .setFooter("Copyright (c) 2019 Z Projekt under MIT License.")
          .setTimestamp(new Date());
        break;

      case "you":
        info_embed
          .setColor(0x36393f)
          .setAuthor(GlobalVars.bot.user.tag, GlobalVars.bot.user.avatarURL)
          .setDescription("Info about me.")
          .setThumbnail(GlobalVars.bot.user.avatarURL)
          .addField(
            "General info.",
            `Uptime: \`${FormattingUtils.time(process.uptime())}\`
             Process args: \`${
               process.argv.slice(2).length == 0
                 ? "none"
                 : process.argv.slice(2).join(" ")
             }\`
             API Wrapper: \`discord.js\` (https://discord.js.org/)
             Repository URL: https://github.com/z-projekt/laura/`,
            false
          )
          .setFooter("Copyright (c) 2019 Z Projekt under MIT License.")
          .setTimestamp(new Date());
        break;
    }

    message.channel.send(info_embed);
  }
}
