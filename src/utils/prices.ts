/**
 * Prices for each block valid from 1.7.2024 to 31.12.2024.
 * @see https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-3431/akt-o-dolocitvi-tarifnih-postavk-za-omreznine-elektrooperaterjev
 */
export const PRICES = [
  { block: 1, energy: 0.00663, power: 0.24923 },
  { block: 2, energy: 0.0062, power: 0.04877 },
  { block: 3, energy: 0.00589, power: 0.01103 },
  { block: 4, energy: 0.00592, power: 0.00038 },
  { block: 5, energy: 0.00589, power: 0.0 },
];

/**
 * Get the price for a given block number.
 *
 * @param block number
 * @returns number
 */
export const getBlockPrice = (block: number) => {
  return PRICES.find((price) => price.block === block);
};
