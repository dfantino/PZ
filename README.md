# Process Flow Documentation

An interactive, web-based process flow visualization tool for documenting company workflows from cradle to grave. Built with React and ReactFlow, featuring swimlane diagrams with clickable process steps and markdown-powered documentation.

## Overview

This application provides a visual representation of end-to-end business processes, organized in swimlanes by department or functional area. Users can click on any process step to view detailed documentation, making it easy to understand complex workflows and maintain process documentation.

## Key Features

- **Interactive Swimlane Diagrams** - Visual process flow organized by department/function
- **Clickable Process Steps** - Click any box to view detailed documentation
- **Markdown-Powered Content** - Process documentation written in easy-to-edit markdown files
- **Modular Architecture** - Add new processes by simply editing a config file and creating a markdown file
- **Responsive Design** - Works on desktop and tablet devices
- **Automatic Flow Connections** - Arrows automatically connect processes in sequence

## Project Structure
```
process-swimlane/
├── public/
│   ├── processes/           # Markdown files for each process step
│   │   ├── process-a.md
│   │   ├── process-b.md
│   │   └── ...
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js              # Main application component
│   ├── processConfig.js    # Configuration file (swimlanes & process flow)
│   └── index.js
├── package.json
└── README.md
```

## File Descriptions

### `/public/processes/`
Contains markdown files for each process step. Each file contains the detailed documentation that appears in the modal when users click a process box.

### `/src/processConfig.js`
**Main configuration file** - This is the primary file you'll edit to manage the process flow:
- Define swimlanes (departments/functions) with labels and colors
- Define process steps with row/column positioning
- Link each process to its markdown documentation file

### `/src/App.js`
Main React application component that renders the flow diagram, handles user interactions, and displays modals with markdown content.

## How to Add a New Process

1. **Edit `src/processConfig.js`** - Add a new entry to the `flow` array:
```javascript
   { id: "g", row: 2, col: 5, label: "New Process", mdFile: "process-g.md" }
```

2. **Create the markdown file** - Add `public/processes/process-g.md` with your documentation

3. **Save and refresh** - The new process box will automatically appear in the diagram

## Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Technologies Used

- **React** - UI framework
- **ReactFlow** - Flow diagram library
- **react-markdown** - Markdown rendering
- **GitHub Pages** - Hosting

## Maintenance

To update process documentation, simply edit the markdown files in `public/processes/`. No code changes required!

To modify the flow structure (add/remove processes, change swimlanes), edit `src/processConfig.js`.