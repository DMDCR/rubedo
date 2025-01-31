import {
  Enchantment,
  EnchantmentList,
  Items,
  ItemStack,
  MinecraftEnchantmentTypes,
} from "mojang-minecraft";

/**
 * @typedef {Object} ItemComponents the components on a item
 * @property {String} nameTag the nametag of the item
 * @property {String[]} lore The lore of the item
 * @property {Enchantment[]} enchantments The lore of the item
 * @property {String} dbKey the db key of this itemStack
 */

export class Item {
  /**
   * Converts a itemStack to a Item
   * @param {ItemStack} item
   * @param {Object} extras extra info to store on the item
   */
  static itemStackToItem(item, extras = {}) {
    /**
     * @type {EnchantmentList}
     */
    const enchantments = item.getComponent("enchantments").enchantments;
    const ItemStackEnchantments = [];
    for (const Enchantment in MinecraftEnchantmentTypes) {
      const ItemEnchantment = enchantments.getEnchantment(
        MinecraftEnchantmentTypes[Enchantment]
      );
      if (!ItemEnchantment) continue;
      ItemStackEnchantments.push(MinecraftEnchantmentTypes[Enchantment]);
    }
    return new Item(item.id, item.amount, item.data, {
      nameTag: item.nameTag,
      lore: item.getLore(),
      enchantments: ItemStackEnchantments,
    });
  }

  /**
   * Creates a new Item used for chest GUI
   * @param {String} id the item id of the item
   * @param {Number} amount the amount of this item
   * @param {Number} data the data value of this item
   * @param {ItemComponents} components the items components
   * @param {ItemStack} itemStack this itemStack
   */
  constructor(id, amount = 1, data = 0, components = {}, itemStack = null) {
    this.id = id;
    this.amount = amount;
    this.data = data;
    this.components = components;

    this.itemStack = itemStack
      ? itemStack
      : new ItemStack(Items.get(this.id), amount, data);
  }

  /**
   * Sets a components to this item
   * @param {ItemComponents} components the items components
   * @returns {ItemStack}
   */
  setComponents(components = this.components) {
    this.components = components;
    if (components?.nameTag) this.itemStack.nameTag = components.nameTag;
    if (this.components?.lore) this.itemStack.setLore(this.components.lore);
    if (components?.enchantments?.length > 0) {
      /**
       * @type {EnchantmentList}
       */
      const ItemStackEnchantments =
        this.itemStack.getComponent("enchantments").enchantments;
      for (const ench of components.enchantments) {
        ItemStackEnchantments.addEnchantment(ench);
      }
      this.itemStack.getComponent("enchantments").enchantments =
        ItemStackEnchantments;
    }
    return this.itemStack;
  }
}
