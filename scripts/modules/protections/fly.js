import { PlayerLog } from "../models/PlayerLog.js";
import { forEachValidPlayer } from "../../utils";
import { PreviousLocation as PrevLo } from "../models/PreviousLocation.js";
import { ItemStack, Player } from "mojang-minecraft";

/**
 * Minecraft Bedrock Anti Fly
 * @license MIT
 * @author Smell of curry
 * @author moisesgamingtv9
 * @version 1.0.0
 * --------------------------------------------------------------------------
 * This anti fly works by detecting horizontal velocity, bassicly when
 * the player has reached the FLYING_VELOCITY they are considered flying And
 * if they are considered flying for 1 second they will be teleported back.
 * --------------------------------------------------------------------------
 */

/**
 * Stores Last Previous grounded location
 */
const log = new PlayerLog();

/**
 * The Velocity of the player when there flying
 */
const FLYING_VELOCITY = 0.9;

/**
 * The max ammount of time in ticks you can "fly" for
 */
const FLY_TIME = 20;

/**
 * If this is true it will damage the player when they get tped back
 */
const DAMAGE = true;

/**
 * If a player has one of these tags then the proccess stops for them
 */
const TAGS = ["gliding", "riding", "levitating", "swimming"];

/**
 * Gets a players held item
 * @param {Player} player player you want to get
 * @returns {ItemStack}
 * @example getHeldItem(Player);
 */
function getHeldItem(player) {
  /**
   * @type {PlayerInventoryComponentContainer}
   */
  const inventory = player.getComponent("minecraft:inventory").container;
  return inventory.getItem(player.selectedSlot);
}

forEachValidPlayer((player, { currentTick }) => {
  if (player.getTags().some((tag) => TAGS.includes(tag))) return;
  const get = () => log.get(player) ?? new PrevLo(player, currentTick, log);
  const velocity = Math.sqrt(player.velocity.x ** 2 + player.velocity.z ** 2);
  if (player.hasTag("on_ground")) return get().update();
  if (velocity < FLYING_VELOCITY) return;
  if (getHeldItem(player) == "minecraft:trident") return;
  if (currentTick - get().tick < FLY_TIME) return;
  // Player is flying
  get().back();
  if (DAMAGE) {
    try {
      player.runCommand(`damage @s 4 fly_into_wall`);
    } catch (error) {}
  }
}, 20);
