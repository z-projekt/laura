import * as discord from "discord.js";
import * as fs from "fs";
import * as path from "path";

import { ICommand, IEvent, IConfig } from "./definitions";
import { GlobalVars } from "./global_vars";

export class Laura {
  constructor() {
    GlobalVars.bot = new discord.Client();
    GlobalVars.config = require(path.join(
      __dirname,
      "..",
      "config.json"
    )) as IConfig;
    GlobalVars.commands = [];
    GlobalVars.events = [];
  }

  private register_commands() {
    const commands = fs.readdirSync(path.join(__dirname, "commands"), "utf8");

    for (const command of commands) {
      const required_command = require(path.join(
        __dirname,
        "commands",
        command
      )).default;
      const command_class = new required_command() as ICommand;
      GlobalVars.commands.push(command_class);
      console.log(`  packed ${command} command :O`)
    }
  }

  private register_events() {
    const events = fs.readdirSync(path.join(__dirname, "events"), "utf8");

    for (const event of events) {
      const required_event = require(path.join(
        __dirname, 
        "events",
        event
      )).default;
      const event_class = new required_event() as IEvent;
      GlobalVars.bot.on(
        event_class.name,
        event_class.override.bind(null, GlobalVars.bot)
      );
      GlobalVars.events.push(event_class);
      console.log(`  packed ${event} event :O`)
    }
  }

  public start() {
    console.log("i've just started packing my baggage...")
    console.log(" commands:")
    this.register_commands();
    console.log(" events:")
    this.register_events();
    GlobalVars.bot.login(GlobalVars.config.token);
    console.log("im ready to flight! :)")
  }
}
