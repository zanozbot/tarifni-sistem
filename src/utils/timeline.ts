import { TimelineOptions } from "vis-timeline";
import { isMobile, isTablet } from "./size";

const zoomMinMultiplier = isMobile ? 4 : isTablet ? 6 : 10;
/**
 * Current time.
 */
export const now = new Date();
/**
 * Start date for the visible timeline.
 */
export const start = new Date(now.valueOf() - 1000 * 60 * 60 * 1); // 1 hour ago
/**
 * End date for the visible timeline.
 */
const end = new Date(now.valueOf() + 1000 * 60 * 60 * zoomMinMultiplier);
/**
 * Minimum date for the timeline.
 */
export const min = new Date(now.valueOf() - 1000 * 60 * 60 * 24 * 14);
/**
 * Maximum date for the timeline.
 */
export const max = new Date(now.valueOf() + 1000 * 60 * 60 * 24 * 14); // 14 days from now

/**
 * Options for the timeline.
 */
export const options: TimelineOptions = {
  stack: false,
  horizontalScroll: true,
  verticalScroll: false,
  zoomable: true,
  zoomMax: 1000 * 60 * 60 * 24 * 7, // 7 days
  zoomMin: 1000 * 60 * 60 * zoomMinMultiplier,
  zoomKey: "ctrlKey",
  itemsAlwaysDraggable: false,
  height: "100%",
  locale: "sl",
  showCurrentTime: true,
  groupHeightMode: "fitItems",
  selectable: false,
  format: {
    minorLabels: {
      weekday: "dddd D. M.",
      day: "D. M.",
    },
    majorLabels: {
      minute: "dddd D. MMMM",
      hour: "dddd D. MMMM",
    },
  },
  start,
  end,
  min,
  max,
  editable: false,
  margin: {
    item: 4, // minimal margin between items
    axis: 0, // minimal margin between items and the axis
  },
  orientation: "top",
};
