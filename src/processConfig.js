// processConfig.js
// ==========================================
// CONFIGURATION - Easy to edit
// This is the only file you need to modify to update the process flow
// ==========================================

export const LANE_HEIGHT = 150;
export const NODE_WIDTH = 150;
export const HORIZONTAL_SPACING = 150;
export const START_X = 50;
export const START_Y = 100;

export const PROCESS_CONFIG = {
  // Swimlane labels and colors (one per row)
swimLanes: [
  { id: "lane1", label: "Sales", color: "#3b82f6" },                    // Blue
  { id: "lane2", label: "Program Management", color: "#8b5cf6" },       // Purple
  { id: "lane3", label: "Manufacturing", color: "#ef4444" },            // Red
  { id: "lane5", label: "Mechanical", color: "#f59e0b" },               // Orange
  { id: "lane6", label: "Electrical/RF", color: "#06b6d4" },            // Cyan
  { id: "lane7", label: "Digital", color: "#ec4899" },                  // Pink
  { id: "lane8", label: "Software", color: "#10b981" },                 // Green
  { id: "lane9", label: "I&T", color: "#6366f1" },                      // Indigo
  { id: "lane10", label: "Document Control", color: "#84cc16" },        // Lime
  { id: "lane11", label: "Planning", color: "#14b8a6" },                // Teal
  { id: "lane12", label: "Purchasing", color: "#f97316" },              // Orange-Red
  { id: "lane13", label: "Receiving", color: "#a855f7" },               // Purple-Violet
  { id: "lane14", label: "Quality", color: "#0ea5e9" },                 // Sky Blue
  { id: "lane15", label: "Shipping", color: "#22c55e" },                // Emerald
  { id: "lane16", label: "Accounting", color: "#eab308" },              // Yellow
  { id: "lane17", label: "Repairs", color: "#64748b" },                 // Slate
],

  // Define your process flow using ROW, COLUMN, and MARKDOWN FILE
  // Just add a new line here and create the .md file later
  flow: [
    { id: "a", row: 1, col: 1, label: "Process A", mdFile: "process-a.md" },
    { id: "b", row: 1, col: 2, label: "Process B", mdFile: "process-b.md" },
    { id: "c", row: 2, col: 3, label: "Process C", mdFile: "process-c.md" },
    { id: "d", row: 2, col: 4, label: "Process D", mdFile: "process-d.md" },
    { id: "e", row: 3, col: 5, label: "Process E", mdFile: "process-e.md" },
    { id: "f", row: 4, col: 6, label: "Process F", mdFile: "process-f.md" },
  ],
};
