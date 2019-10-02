import * as discord from "discord.js";
import { IConfig, Commands, Events } from "./definitions";

export class GlobalVars {
  public static bot: discord.Client = null;
  public static config: IConfig = null;
  public static commands: Commands = null;
  public static events: Events = null;
}
