# Task: Project Setup

## Responsible Role
**Program Management** (Primary Driver for Process D)

## When This Happens
Immediately after order is entered by Sales in Process D (Order Entry phase). This task runs in parallel with order entry but becomes the primary driver for subsequent phases.

## Purpose
Establish the project infrastructure, tracking systems, and team structure needed to execute the customer order from design through delivery.

## Detailed Step-by-Step Instructions

### Step 1: Create Project Folder Structure
1. Navigate to SharePoint Projects site
2. Click "New Project Folder"
3. Use naming convention: `[Year]-[ProjectNumber]-[CustomerName]`
4. Create standard subfolders:
   - `/Documents` - All project documentation
   - `/Meetings` - Meeting notes and presentations
   - `/Deliverables` - Customer-facing deliverables
   - `/Design` - Engineering files
   - `/Manufacturing` - Build documentation
   - `/Quality` - Test reports and certifications

**Tool**: SharePoint

### Step 2: Initialize Project in ERP System
1. Open ERP > Projects > New Project
2. Enter project details:
   - Project name (match SharePoint folder)
   - Customer name and PO number
   - Project manager assignment
   - Budget allocation
3. Generate project code (will be used for all time tracking)
4. Set up cost centers:
   - Engineering
   - Manufacturing
   - Quality
   - Program Management
5. Initialize milestone tracking gates

**Tool**: Company ERP System

### Step 3: Create Project Schedule
1. Open MS Project or Jira
2. Load project template for product type:
   - Standard product: Use "Standard-Schedule-Template.mpp"
   - Custom product: Use "Custom-Schedule-Template.mpp"
3. Update key dates:
   - Customer delivery date (from contract)
   - Design review milestones
   - Manufacturing start date
   - Test completion date
4. Assign durations based on PM estimates from quoting phase
5. Add dependencies between tasks
6. Identify critical path
7. Add 10% schedule margin for risk

**Tool**: MS Project or Jira

### Step 4: Assign Core Team Members
Select team based on project scope and resource availability:

**Required roles:**
- Engineering Lead (Mechanical, Electrical, or Digital depending on product)
- Manufacturing Coordinator
- Quality Representative
- Purchasing Coordinator (for long-lead items)

**Assignment process:**
1. Check resource calendar for availability
2. Send team assignment emails
3. Add team members to SharePoint folder permissions
4. Add team members to project distribution list

### Step 5: Schedule Project Kickoff Meeting
1. Find 2-hour block within 3 days of project setup
2. Invite core team + Sales + Customer (if required)
3. Prepare kickoff agenda:
   - Project overview and objectives
   - Customer requirements review
   - Schedule walkthrough
   - Resource commitments
   - Risk discussion
   - Next steps and action items
4. Book conference room and set up Teams meeting
5. Attach kickoff agenda template to meeting invite

## Completion Checklist
- [ ] SharePoint project folder created with all subfolders
- [ ] ERP project code generated and communicated to team
- [ ] Cost centers activated in ERP
- [ ] Project schedule created and saved
- [ ] Critical path identified
- [ ] Engineering lead assigned and confirmed
- [ ] Manufacturing coordinator assigned
- [ ] Quality rep assigned
- [ ] Purchasing coordinator notified
- [ ] Kickoff meeting scheduled within 3 days
- [ ] Kickoff agenda prepared and distributed
- [ ] All team members have SharePoint access

## Common Issues & Solutions

### Issue: Cannot create project code in ERP
**Solution**: Contact IT helpdesk - you may need elevated permissions. Provide project details and customer PO number.

### Issue: Resource not available for assignment
**Solution**: Escalate to department manager. Identify backup resource. Document in project risk register.

### Issue: Customer delivery date conflicts with resource availability
**Solution**: Present options to customer: 1) Accept later delivery date, 2) Pay for expedited resources. Coordinate with Sales.

## Tools & Systems Required
- SharePoint (project folders)
- Company ERP System (project codes, cost tracking)
- MS Project or Jira (scheduling)
- Outlook (meetings, team communication)
- Resource Calendar (availability checking)

## Forms & Templates
- [Project Folder Template](https://company.sharepoint.com/templates/project-folder)
- [Standard Schedule Template](https://company.sharepoint.com/templates/schedule-standard.mpp)
- [Custom Schedule Template](https://company.sharepoint.com/templates/schedule-custom.mpp)
- [Kickoff Agenda Template](https://company.sharepoint.com/templates/kickoff-agenda.docx)
- [Team Assignment Email Template](https://company.sharepoint.com/templates/team-assignment.msg)

## Who to Contact
- **ERP Issues**: IT Helpdesk (x5000)
- **Resource Conflicts**: Department Managers
- **Schedule Questions**: Planning Manager (x2100)
- **Customer Delivery Changes**: Sales Manager (x1002)

## References
- [Program Management Handbook](https://company.intranet.com/pm/handbook)
- [Project Setup Guide](https://company.intranet.com/pm/setup-guide)
- [ERP Project Module User Guide](https://company.intranet.com/it/erp-projects)

## Time Estimate
**Typical duration**: 2-4 hours for experienced PM

**Breakdown:**
- SharePoint setup: 30 min
- ERP configuration: 45 min
- Schedule creation: 60-90 min
- Team assignments: 30 min
- Kickoff planning: 15 min