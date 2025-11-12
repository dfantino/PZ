// processConfig.js
// ==========================================
// CONFIGURATION - Easy to edit
// This is the only file you need to modify to update the process flow
// ==========================================

// Re-export constants for backward compatibility
export { LANE_HEIGHT, NODE_WIDTH, HORIZONTAL_SPACING, START_X, START_Y } from './constants';

export const PROCESS_CONFIG = {
  // Swimlane labels, colors, and department markdown files
  swimLanes: [
    { id: "lane1", label: "Sales", color: "#3b82f6", deptMdFile: "sales.md" },
    { id: "lane2", label: "Program Management", color: "#8b5cf6", deptMdFile: "program-management.md" },
    { id: "lane3", label: "Manufacturing", color: "#ef4444", deptMdFile: "manufacturing.md" },
    { id: "lane5", label: "Mechanical", color: "#f59e0b", deptMdFile: "mechanical.md" },
    { id: "lane6", label: "Electrical/RF", color: "#06b6d4", deptMdFile: "electrical-rf.md" },
    { id: "lane7", label: "Digital", color: "#ec4899", deptMdFile: "digital.md" },
    { id: "lane8", label: "Software", color: "#10b981", deptMdFile: "software.md" },
    { id: "lane9", label: "I&T", color: "#6366f1", deptMdFile: "i-and-t.md" },
    { id: "lane10", label: "Document Control", color: "#84cc16", deptMdFile: "document-control.md" },
    { id: "lane11", label: "Planning", color: "#14b8a6", deptMdFile: "planning.md" },
    { id: "lane12", label: "Purchasing", color: "#f97316", deptMdFile: "purchasing.md" },
    { id: "lane13", label: "Receiving", color: "#a855f7", deptMdFile: "receiving.md" },
    { id: "lane14", label: "Quality", color: "#0ea5e9", deptMdFile: "quality.md" },
    { id: "lane15", label: "Shipping", color: "#22c55e", deptMdFile: "shipping.md" },
    { id: "lane16", label: "Accounting", color: "#eab308", deptMdFile: "accounting.md" },
    { id: "lane17", label: "Repairs", color: "#64748b", deptMdFile: "repairs.md" },
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
    { id: "g", row: 5, col: 7, label: "Process G", mdFile: "" },
    { id: "h", row: 5, col: 8, label: "Process H", mdFile: "" },
    { id: "i", row: 6, col: 9, label: "Process I", mdFile: "" },
    { id: "j", row: 9, col: 10, label: "Process J", mdFile: "" }
  ],
};