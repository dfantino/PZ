// constants.js
// Global constants and theme values

// Layout constants
export const LANE_HEIGHT = 150;
export const NODE_WIDTH = 150;
export const HORIZONTAL_SPACING = 150;
export const START_X = 50;
export const START_Y = 100;

// Theme colors
export const COLORS = {
  background: '#f8fafc',
  gridLines: '#cbd5e1',
  gridBackground: '#e2e8f0',
  tooltipBg: '#1f2937',
  modalOverlay: 'rgba(0,0,0,0.7)',
};

// Z-index layers
export const Z_INDEX = {
  swimlaneBg: -1,
  node: 10,
  tooltip: 1000,
  modal: 9999,
};