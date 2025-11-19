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
    { id: "lane1", label: "Business Development", color: "#3b82f6", deptMdFile: "business-development.md" },
    { id: "lane2", label: "Program Management", color: "#8b5cf6", deptMdFile: "program-management.md" },
    { id: "lane3", label: "Mechanical", color: "#f59e0b", deptMdFile: "mechanical.md" },
    { id: "lane4", label: "Electrical", color: "#06b6d4", deptMdFile: "electrical.md" },
    { id: "lane5", label: "Digital", color: "#ec4899", deptMdFile: "digital.md" },
    { id: "lane6", label: "Software", color: "#10b981", deptMdFile: "software.md" },
    { id: "lane7", label: "Planning", color: "#f97316", deptMdFile: "planning.md" },
    { id: "lane8", label: "Purchasing", color: "#6366f1", deptMdFile: "purchasing.md" },
    { id: "lane9", label: "Manufacturing", color: "#ef4444", deptMdFile: "manufacturing.md" },
    { id: "lane10", label: "I&T", color: "#8b5cf6", deptMdFile: "it.md" },
    { id: "lane11", label: "Accounting", color: "#14b8a6", deptMdFile: "accounting.md" },
    { id: "lane12", label: "Shipping", color: "#f59e0b", deptMdFile: "shipping.md" },
    { id: "lane13", label: "Repairs", color: "#0ea5e9", deptMdFile: "repairs.md" },
  ],

  // Process phase definitions (for column headers)
  processPhases: [
    { col: 1, name: "Customer Inquiry", mdFile: "process-a.md" },
    { col: 2, name: "Requirements", mdFile: "process-b.md" },
    { col: 3, name: "Proposal & Quote", mdFile: "process-c.md" },
    { col: 4, name: "Contract Award", mdFile: "process-d.md" },
    { col: 5, name: "Project Planning", mdFile: "process-e.md" },
    { col: 6, name: "Project Kickoff", mdFile: "process-f.md" },
    { col: 7, name: "Develop Specifications", mdFile: "process-g.md" },
    { col: 8, name: "Preliminary Design", mdFile: "process-h.md" },
    { col: 9, name: "Detailed Design", mdFile: "process-i.md" },
    { col: 10, name: "Prototype Build", mdFile: "process-j.md" },
    { col: 11, name: "Verifications", mdFile: "process-k.md" },
    { col: 12, name: "Qual Testing", mdFile: "process-l.md" },
    { col: 13, name: "Rework Cycle", mdFile: "process-m.md" },
    { col: 14, name: "Productization", mdFile: "process-n.md" },
    { col: 15, name: "First Article Inspection", mdFile: "process-o.md" },
    { col: 16, name: "Acceptance Testing", mdFile: "process-p.md" },
    { col: 17, name: "Configuration Management", mdFile: "process-q.md" },
    { col: 18, name: "Delivery & Acceptance", mdFile: "process-r.md" },
    { col: 19, name: "Project Closeout", mdFile: "process-s.md" },
    { col: 20, name: "Product Support", mdFile: "process-t.md" },
    { col: 21, name: "Repairs/Warranty", mdFile: "process-u.md" },
  ],

  // Individual task definitions - point to task-specific files
  flow: [
    // Column 1: Customer Inquiry - Business Development primary
    { id: "a1", row: 1, col: 1, label: "Receive Inquiry", primary: true, mdFile: "task-receive-inquiry.md" },
    
    // Column 2: Requirements - Program Management primary
    { id: "b1", row: 2, col: 2, label: "Gather Requirements", primary: true, mdFile: "task-gather-requirements.md" },
    { id: "b2", row: 1, col: 2, label: "Customer Workshop", mdFile: "task-customer-workshop.md" },
    
    // Column 3: Proposal & Quote - Business Development primary
    { id: "c1", row: 1, col: 3, label: "Prepare Proposal", primary: true, mdFile: "task-prepare-proposal.md" },
    { id: "c2", row: 8, col: 3, label: "Get Cost Estimates", mdFile: "task-get-estimates.md" },
    
    // Column 4: Contract Award - Business Development primary
    { id: "d1", row: 1, col: 4, label: "Negotiate Contract", primary: true, mdFile: "task-negotiate-contract.md" },
    { id: "d2", row: 11, col: 4, label: "Finance Review", mdFile: "task-finance-review.md" },
    
    // Column 5: Project Planning - Program Management primary
    { id: "e1", row: 2, col: 5, label: "Create Project Plan", primary: true, mdFile: "task-project-setup.md" },
    { id: "e2", row: 8, col: 5, label: "Procurement Plan", mdFile: "task-procurement-plan.md" },
    
    // Column 6: Project Kickoff - Program Management primary
    { id: "f1", row: 2, col: 6, label: "Kickoff Meeting", primary: true, mdFile: "task-kickoff-meeting.md" },
    { id: "f2", row: 1, col: 6, label: "Customer Sync", mdFile: "task-customer-sync.md" },
    
    // Column 7: Develop Specifications - Program Management primary
    { id: "g1", row: 2, col: 7, label: "Develop Specs", primary: true, mdFile: "task-develop-specs.md" },
    { id: "g2", row: 3, col: 7, label: "Mech Specifications", mdFile: "task-mech-specs.md" },
    { id: "g3", row: 4, col: 7, label: "Elec Specifications", mdFile: "task-elec-specs.md" },
    { id: "g4", row: 5, col: 7, label: "Digital Specifications", mdFile: "task-digital-specs.md" },
    
    // Column 8: Preliminary Design - Multiple departments
    { id: "h1", row: 3, col: 8, label: "Mech Design", mdFile: "task-mech-design.md" },
    { id: "h2", row: 4, col: 8, label: "Elec Design", mdFile: "task-elec-design.md" },
    { id: "h3", row: 5, col: 8, label: "Digital Design", mdFile: "task-digital-design.md" },
    { id: "h4", row: 6, col: 8, label: "Software Design", primary: true, mdFile: "task-software-design.md" },
    
    // Column 9: Detailed Design - Multiple departments
    { id: "i1", row: 3, col: 9, label: "Detailed Mech", mdFile: "task-detailed-mech.md" },
    { id: "i2", row: 4, col: 9, label: "Detailed Elec", mdFile: "task-detailed-elec.md" },
    { id: "i3", row: 5, col: 9, label: "Detailed Digital", mdFile: "task-detailed-digital.md" },
    { id: "i4", row: 6, col: 9, label: "Detailed Software", primary: true, mdFile: "task-detailed-software.md" },
    
    // Column 10: Prototype Build - Manufacturing primary
    { id: "j1", row: 9, col: 10, label: "Build Prototype", primary: true, mdFile: "task-build-prototype.md" },
    { id: "j2", row: 8, col: 10, label: "Order Components", mdFile: "task-order-components.md" },
    { id: "j3", row: 3, col: 10, label: "Mech Assembly", mdFile: "task-mech-assembly.md" },
    
    // Column 11: Verifications - Digital primary
    { id: "k1", row: 5, col: 11, label: "Verification Test", primary: true, mdFile: "task-verification-test.md" },
    { id: "k2", row: 6, col: 11, label: "Software Verification", mdFile: "task-software-verification.md" },
    
    // Column 12: Qual Testing - Digital primary
    { id: "l1", row: 5, col: 12, label: "Qual Testing", primary: true, mdFile: "task-qual-testing.md" },
    { id: "l2", row: 9, col: 12, label: "Manufacturing QA", mdFile: "task-manufacturing-qa.md" },
    
    // Column 13: Rework Cycle - Manufacturing primary
    { id: "m1", row: 9, col: 13, label: "Rework/Retest", primary: true, mdFile: "task-rework-retest.md" },
    
    // Column 14: Productization - Manufacturing primary
    { id: "n1", row: 9, col: 14, label: "Productionize", primary: true, mdFile: "task-productionize.md" },
    { id: "n2", row: 7, col: 14, label: "Production Plan", mdFile: "task-production-plan.md" },
    
    // Column 15: First Article Inspection - Manufacturing primary
    { id: "o1", row: 9, col: 15, label: "First Article", primary: true, mdFile: "task-first-article.md" },
    
    // Column 16: Acceptance Testing - Digital primary
    { id: "p1", row: 5, col: 16, label: "Acceptance Test", primary: true, mdFile: "task-acceptance-test.md" },
    
    // Column 17: Configuration Management - Planning primary
    { id: "q1", row: 7, col: 17, label: "Config Mgmt", primary: true, mdFile: "task-config-mgmt.md" },
    { id: "q2", row: 6, col: 17, label: "Documentation", mdFile: "task-documentation.md" },
    
    // Column 18: Delivery & Acceptance - Shipping primary
    { id: "r1", row: 12, col: 18, label: "Ship Product", primary: true, mdFile: "task-ship-product.md" },
    { id: "r2", row: 1, col: 18, label: "Customer Acceptance", mdFile: "task-customer-acceptance.md" },
    
    // Column 19: Project Closeout - Program Management primary
    { id: "s1", row: 2, col: 19, label: "Project Closeout", primary: true, mdFile: "task-project-closeout.md" },
    { id: "s2", row: 11, col: 19, label: "Finance Closeout", mdFile: "task-finance-closeout.md" },
    
    // Column 20: Product Support - I&T primary
    { id: "t1", row: 10, col: 20, label: "Customer Support", primary: true, mdFile: "task-customer-support.md" },
    
    // Column 21: Repairs/Warranty - Repairs primary
    { id: "u1", row: 13, col: 21, label: "RMA", primary: true, mdFile: "task-warranty-repairs.md" },
  ],
};