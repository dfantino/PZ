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
    { id: "lane1", label: "Sales", color: "#3b82f6" },
    { id: "lane2", label: "Program Management", color: "#10b981" },
    { id: "lane3", label: "Manufacturing", color: "#ef4444" },
    { id: "lane5", label: "Mechanical", color: "#f59e0b" },
    { id: "lane6", label: "Electrical/RF", color: "#000000ff" },
    { id: "lane7", label: "Digital", color: "#b87a7aff" },
    { id: "lane8", label: "Software", color: "#b41717ff" },
    { id: "lane9", label: "I&T", color: "#970b97ff" },
    { id: "lane10", label: "Document Control", color: "#0f0f" },
    { id: "lane11", label: "Planning", color: "#808080" },
    { id: "lane12", label: "Purchasing", color: "#808080" },
    { id: "lane13", label: "Receiving", color: "#808080" },
    { id: "lane14", label: "Quality", color: "#808080" },
    { id: "lane15", label: "Shipping", color: "#808080" },
    { id: "lane16", label: "Accounting", color: "#808080" },
    { id: "lane17", label: "Repairs", color: "#808080" },
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
