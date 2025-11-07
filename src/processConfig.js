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

  // Define your process flow using ROW and COLUMN (like Excel)
  // Row 1 = Sales, Row 2 = Engineering, Row 3 = Manufacturing, Row 4 = Logistics
  flow: [
    {
      id: "a",
      row: 1,
      col: 1,
      label: "Process A",
      modalData: {
        title: "Process A - Customer Order Intake",
        description: `This is the first step in our comprehensive order-to-delivery process.

In this phase, the sales team receives and logs customer orders into our CRM system. This involves validating customer information, checking credit status, and confirming product availability.

Key activities include:
- Initial customer contact and needs assessment
- Order form completion and validation
- Credit check authorization
- Preliminary inventory verification

This step is critical as it sets the foundation for the entire fulfillment process. Any errors or omissions here can cascade through subsequent stages, causing delays and customer dissatisfaction.

The team must ensure all required fields are completed accurately and that customer expectations are properly documented for downstream teams.`,
        roles: ["Sales Manager", "Sales Representative", "Customer Service", "Credit Department"],
        duration: "1-2 days",
        deliverables: [
          "Completed Order Form",
          "Customer Information Sheet",
          "Credit Approval Document",
          "Initial Order Confirmation Email",
        ],
        links: [
          { text: "Order Form Template", url: "#" },
          { text: "CRM System Login", url: "#" },
          { text: "Credit Check Procedure", url: "#" },
        ],
      },
    },
    {
      id: "b",
      row: 1,
      col: 2,
      label: "Process B",
      modalData: {
        title: "Process B",
        description: "Second step",
        roles: ["Ops"],
        duration: "4 hours",
        deliverables: ["Validation"],
        links: [],
      },
    },
    {
      id: "c",
      row: 2,
      col: 3,
      label: "Process C",
      modalData: {
        title: "Process C",
        description: "Third step",
        roles: ["Engineering"],
        duration: "3 days",
        deliverables: ["Requirements"],
        links: [],
      },
    },
    {
      id: "d",
      row: 2,
      col: 4,
      label: "Process D",
      modalData: {
        title: "Process D",
        description: "Fourth step",
        roles: ["Design"],
        duration: "2 weeks",
        deliverables: ["Design"],
        links: [],
      },
    },
    {
      id: "e",
      row: 3,
      col: 5,
      label: "Process E",
      modalData: {
        title: "Process E",
        description: "Fifth step",
        roles: ["Production"],
        duration: "1 week",
        deliverables: ["Product"],
        links: [],
      },
    },
    {
      id: "f",
      row: 4,
      col: 6,
      label: "Process F",
      modalData: {
        title: "Process F",
        description: "Final step",
        roles: ["Logistics"],
        duration: "2 days",
        deliverables: ["Delivery"],
        links: [],
      },
    },
  ],
};
