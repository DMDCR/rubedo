import { world } from "mojang-minecraft";

/**
 * A list of timeouts that are occuring
 * @type {Map<string, Timeout>}
 */
const TIMEOUTS = new Map();

export class Timeout {
  /**
   * Register a timeout
   * @param {() => void} callback On timeout complete code to be executed
   * @param {number} tick tick of the timeout
   */
  constructor(callback, tick, loop = false, id = Date.now()) {
    this.callbackTick = null;
    this.tickDelay = tick;
    this.loop = loop;
    this.callback = callback;
    this.id = id;

    TIMEOUTS.set(id, this);

    this.TickCallBack = world.events.tick.subscribe(({ currentTick }) => {
      if (!this.callbackTick) this.callbackTick = currentTick + this.tickDelay;
      if (this.callbackTick > currentTick) return;
      this.callback(currentTick);

      if (!this.loop) return this.expire();
      this.callbackTick = currentTick + this.tickDelay;
    });
  }

  /**
   * Expires this tickTimeout
   */
  expire() {
    world.events.tick.unsubscribe(this.TickCallBack);
    TIMEOUTS.delete(this.id);
  }
}
