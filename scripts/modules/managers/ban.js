import { APPEAL_LINK } from "../../config/app.js";
import { TABLES } from "../../index.js";
import { kick, forEachValidPlayer, getId, MS } from "../../utils.js";

forEachValidPlayer((player) => {
  const uid = getId(player);
  const banData = TABLES.bans.get(uid);
  if (!banData) return;
  if (banData.expire && banData.expire < Date.now()) return TABLES.bans.delete(uid);
  kick(
    player,
    [
      `§cYou have been banned!`,
      `§aReason: §f${banData.reason}`,
      `§fExpiry: §b${banData.expire ? MS(banData.length) : "Forever"}`,
      `§fAppeal at: §b${APPEAL_LINK}`,
    ],
    () => {
      TABLES.bans.delete(uid);
    }
  );
}, 20);
