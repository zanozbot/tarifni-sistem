/**
 * Prices for each block valid from 1.7.2024 to 31.12.2024.
 * @see https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-3431/akt-o-dolocitvi-tarifnih-postavk-za-omreznine-elektrooperaterjev
 */
export const PRICES = [
  { block: 1, price: 0.00663 },
  { block: 2, price: 0.0062 },
  { block: 3, price: 0.00589 },
  { block: 4, price: 0.00592 },
  { block: 5, price: 0.00589 },
];

/**
 * Get the price for a given block number.
 *
 * @param block number
 * @returns number
 */
export const getBlockPrice = (block: number) => {
  return PRICES.find((price) => price.block === block)?.price;
};
