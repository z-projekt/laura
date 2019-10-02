import * as discord from "discord.js";
import { GlobalVars } from "./global_vars";

export type Commands = ICommand[];
export type Events = IEvent[];

export interface IConfig {
  token: string;
  prefix: string;
}

export interface ICommand {
  description: string;
  syntax: string;
  args: string;
  action(
    message: discord.Message,
    args: string[]
  ): any;
}

export interface IEvent {
  name: string;
  override(...args: any[]): void;
}
