const [width, height] = [window.screen.width, window.screen.height];
export const isMobile = Math.min(width, height) < 768;
export const isTablet = Math.min(width, height) < 1024;
