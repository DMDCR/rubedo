export const text = {
  "api.name": () => "Smelly API",
  "api.error.unknown": () => "An unknown error has occured.",
  "api.database.error.table_name": (a, b) =>
    `The display name ${a} is too long for an objective, it can be at most ${b} characters long`,
  "api.utilities.formatter.error.ms": (a) => `${a} is not a string or a number`,
  "api.Providers.form.invaildtype": (a, b) =>
    `Type ${a} is not a vaild type to add a ${b}`,
  "api.Providers.form.invaildFormtype": (a, b) => {
    `The type ${a} is not a valid type, Vaild types: ${JSON.stringify(b)}`;
  },
  "api.ChestGUI.error.pagenotfound": (a) => `Page ${a} not found!`,
  "modules.protections.cps.clickingToFast": () =>
    `You are clicking to fast! Please click slower!`,
  "modules.managers.mute.isMuted": () =>
    `You are muted and cannot send messages please try again later`,
  "modules.commands.ban.reply": (playerName, length, unit, reason) =>
    `§cBanned §f"§a${playerName}§f" §cfor ${length} ${unit} Because: "${
      reason ?? "No reason Provided"
    }" §aSuccessfully`,
};
