import { Command } from "../../lib/Commands/Command.js";
import { Mute } from "../models/Mute.js";
import { broadcast, getRole } from "../../utils.js";

new Command({
  name: "mute",
  description: "Mute a player for lengths",
  hasPermission: (player) => ["admin", "moderator"].includes(getRole(player)),
})
  .addOption("player", "player", "Player to mute")
  .addOption("length", "int", "Time ammount of mute", true)
  .addOption("unit", "string", "The unit for the time", true)
  .addOption("reason", "string", "reason for mute", true)
  .executes((ctx, { player, length, unit, reason }) => {
    new Mute(player, length, unit, reason, ctx.sender.nameTag);
    ctx.reply(
      `§cMuted §f"§a${player.name}§f" §cfor ${length} ${unit} Because: "${
        reason ?? "No reason Provided"
      }" §aSuccessfully`
    );
    broadcast(
      `§cYou have been muted by §f"${
        ctx.sender.name
      }" §cfor ${length} ${unit} Because: "${reason ?? "No reason Provided"}"`,
      player.nameTag
    );
  });
