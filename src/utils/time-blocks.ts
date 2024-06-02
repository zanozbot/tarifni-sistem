import { DataItem } from "vis-timeline";
import { HOLYDAYS } from "./holydays";
import { max, min } from "./timeline";
import { isEasterMonday } from "./easter";
import { getBlockPrice } from "./prices";

/**
 * High season start and end month.
 */
const HIGH_SEASON = {
  start: 10, // November
  end: 1, // February
};

/**
 * Low season start and end month.
 */
const LOW_SEASON = {
  start: 2, // March
  end: 9, // October
};

/**
 * Time blocks for high season on workdays.
 */
const TIME_BLOCKS_HIGH_SEASON_WORKDAYS = [
  { block: 1, start: 7, end: 14 },
  { block: 1, start: 16, end: 20 },
  { block: 2, start: 6, end: 7 },
  { block: 2, start: 14, end: 16 },
  { block: 2, start: 20, end: 22 },
  { block: 3, start: 0, end: 6 },
  { block: 3, start: 22, end: 0, day: 1 },
];

/**
 * Time blocks for high season on weekends and holydays.
 */
const TIME_BLOCKS_HIGH_SEASON_WEEKENDS_AND_HOLYDAYS = [
  { block: 2, start: 7, end: 14 },
  { block: 2, start: 16, end: 20 },
  { block: 3, start: 6, end: 7 },
  { block: 3, start: 14, end: 16 },
  { block: 3, start: 20, end: 22 },
  { block: 4, start: 0, end: 6 },
  { block: 4, start: 22, end: 0, day: 1 },
];

/**
 * Time blocks for low season on workdays.
 */
const TIME_BLOCKS_LOW_SEASON_WORKDAYS = [
  { block: 2, start: 7, end: 14 },
  { block: 2, start: 16, end: 20 },
  { block: 3, start: 6, end: 7 },
  { block: 3, start: 14, end: 16 },
  { block: 3, start: 20, end: 22 },
  { block: 4, start: 0, end: 6 },
  { block: 4, start: 22, end: 0, day: 1 },
];

/**
 * Time blocks for low season on weekends and holydays.
 */
const TIME_BLOCKS_LOW_SEASON_WEEKENDS_AND_HOLYDAYS = [
  { block: 3, start: 7, end: 14 },
  { block: 3, start: 16, end: 20 },
  { block: 4, start: 6, end: 7 },
  { block: 4, start: 14, end: 16 },
  { block: 4, start: 20, end: 22 },
  { block: 5, start: 0, end: 6 },
  { block: 5, start: 22, end: 0, day: 1 },
];

/**
 * Check if a given date is in high season.
 *
 * @param date Date
 * @returns boolean
 */
export const isHighSeason = (date: Date) => {
  const month = date.getMonth();
  return month >= HIGH_SEASON.start || month <= HIGH_SEASON.end;
};

/**
 * Check if a given date is in low season.
 *
 * @param date Date
 * @returns boolean
 */
export const isLowSeason = (date: Date) => {
  const month = date.getMonth();
  return month >= LOW_SEASON.start && month <= LOW_SEASON.end;
};

/**
 * Get the current time block for a given date.
 *
 * @param date Date
 * @returns object
 */
export const getCurrentTimeBlock = (date: Date) => {
  const timeBlocks = generateTimeBlocks(date);
  const currentTime = date.getHours();

  return timeBlocks.find((block) => {
    return currentTime >= block.start && currentTime < block.end;
  });
};

/**
 * Generate time blocks for a given date.
 *
 * @param date Date
 * @returns array
 */
export const generateTimeBlocks = (date: Date) => {
  const timeBlocks = [];

  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isHolyday = HOLYDAYS.some((holyday) => {
    return holyday.day === date.getDate() && holyday.month === date.getMonth();
  });
  const _isEasternMonday = date.getMonth() === 2 && isEasterMonday(date);

  if (isWeekend || isHolyday || _isEasternMonday) {
    if (isHighSeason(date)) {
      timeBlocks.push(...TIME_BLOCKS_HIGH_SEASON_WEEKENDS_AND_HOLYDAYS);
    } else if (isLowSeason(date)) {
      timeBlocks.push(...TIME_BLOCKS_LOW_SEASON_WEEKENDS_AND_HOLYDAYS);
    }
  } else {
    if (isHighSeason(date)) {
      timeBlocks.push(...TIME_BLOCKS_HIGH_SEASON_WORKDAYS);
    } else if (isLowSeason(date)) {
      timeBlocks.push(...TIME_BLOCKS_LOW_SEASON_WORKDAYS);
    }
  }

  return timeBlocks;
};

/**
 * Generate items for the timeline.
 *
 * @returns array
 */
export const generateItems = (): DataItem[] => {
  // How many dates we have to generate from the start date to the max date
  const daysToGenerate = Math.ceil(
    (max.valueOf() - min.valueOf()) / (1000 * 60 * 60 * 24),
  );

  const items: DataItem[] = [];

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date(min);
    date.setDate(date.getDate() + i);

    generateTimeBlocks(date).forEach((block) => {
      const item: DataItem = {
        start: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          block.start,
        ),
        end: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + (block.day || 0),
          block.end,
        ),
        content: `<span>Blok ${block.block}</span><span>${getBlockPrice(
          block.block,
        )}</span><span>EUR / kWh</span>`,
        className: `block-${block.block}`,
      };

      items.push(item);
    });
  }

  return items;
};
