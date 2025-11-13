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
    { id: "lane4", label: "Mechanical", color: "#f59e0b", deptMdFile: "mechanical.md" },
    { id: "lane5", label: "Electrical/RF", color: "#06b6d4", deptMdFile: "electrical-rf.md" },
    { id: "lane6", label: "Digital", color: "#ec4899", deptMdFile: "digital.md" },
  ],

  // Process phase definitions (for column headers)
  processPhases: [
    { col: 1, name: "Customer Inquiry", mdFile: "process-a.md" },
    { col: 2, name: "Quoting", mdFile: "process-b.md" },
    { col: 3, name: "Submit Quote", mdFile: "process-c.md" },
    { col: 4, name: "Order Entry", mdFile: "process-d.md" },
    { col: 5, name: "Project Kickoff", mdFile: "process-e.md" },
    { col: 6, name: "Integration", mdFile: "process-f.md" },
  ],

  // Individual task definitions - point to task-specific files
  flow: [
    // Column 1: Single box (Sales) - Primary driver
    { id: "a", row: 1, col: 1, label: "Customer Inquiry", primary: true, mdFile: "task-customer-inquiry.md" },
    
    // Column 2: THREE boxes - Sales is primary driver
    { id: "b1", row: 1, col: 2, label: "Draft Quote", primary: true, mdFile: "task-draft-quote.md" },
    { id: "b2", row: 2, col: 2, label: "Give Estimates", mdFile: "task-give-estimates.md" },
    { id: "b3", row: 3, col: 2, label: "Capacity Check", mdFile: "task-capacity-check.md" },
    
    // Column 3: Single box (Sales) - Sales still primary
    { id: "c", row: 1, col: 3, label: "Submit Quote", primary: true, mdFile: "task-submit-quote.md" },
    
    // Column 4: TWO boxes - PM becomes primary driver
    { id: "d1", row: 1, col: 4, label: "Order Entry", mdFile: "task-order-entry.md" },
    { id: "d2", row: 2, col: 4, label: "Project Setup", primary: true, mdFile: "task-project-setup.md" },
    
    // Column 5: THREE boxes - PM continues as primary
    { id: "e1", row: 2, col: 5, label: "Kickoff Meeting", primary: true, mdFile: "task-kickoff-meeting.md" },
    { id: "e2", row: 4, col: 5, label: "Mech Design", mdFile: "task-mech-design.md" },
    { id: "e3", row: 5, col: 5, label: "Elec Design", mdFile: "task-elec-design.md" },
    
    // Column 6: Single box (Digital) - Digital takes over
    { id: "f", row: 6, col: 6, label: "Integration", primary: true, mdFile: "task-integration.md" },
  ],
};