import { LunarPhase, Moon } from "lunarphase-js";

/**
 * Get the first full moon in March for a given year after 21st of March.
 *
 * @param year number
 * @returns Date
 */
export const getFirstFullMoonInMarch = (year: number) => {
  const date = new Date(year, 2, 21);
  const yesterday = new Date(date);
  yesterday.setDate(date.getDate() - 1);

  // If the full moon is on 20st of March, we need to skip it.
  // We add an atrbitrary number of 27 > days > 3 to skip it.
  if (Moon.lunarPhase(yesterday) === LunarPhase.FULL) {
    date.setDate(date.getDate() + 10);
  }

  while (true) {
    if (Moon.lunarPhase(date) === LunarPhase.FULL) {
      return date;
    }
    date.setDate(date.getDate() + 1);
  }
};

/**
 * Check if a given date is a weekend.
 *
 * @param date Date
 * @returns boolean
 */
export const isWeekend = (date: Date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};

/**
 * Get the Easter Sunday for a given date in March.
 *
 * @param date Date
 * @returns Date
 */
export const getEasterSunday = (year: number) => {
  const easterSunday = getFirstFullMoonInMarch(year);

  if (isWeekend(easterSunday)) {
    easterSunday.setDate(easterSunday.getDate() + 7);
  }

  while (easterSunday.getDay() !== 0) {
    easterSunday.setDate(easterSunday.getDate() + 1);
  }

  return easterSunday;
};

/**
 * Get the Easter Monday for a given date in March.
 *
 * @param date Date
 * @returns Date
 */
export const getEasterMonday = (year: number) => {
  const easterMonday = getEasterSunday(year);
  easterMonday.setDate(easterMonday.getDate() + 1);
  return easterMonday;
};

/**
 * Check if a given date is Easter Monday.
 *
 * @param date Date
 * @returns boolean
 */
export const isEasterMonday = (date: Date) => {
  const easterMonday = getEasterMonday(date.getFullYear());
  return (
    easterMonday.getDate() === date.getDate() &&
    easterMonday.getMonth() === date.getMonth() &&
    easterMonday.getFullYear() === date.getFullYear()
  );
};
