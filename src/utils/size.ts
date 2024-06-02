const [width, height] = [window.screen.width, window.screen.height];
export const isMobile = Math.min(width, height) < 768;
