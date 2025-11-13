import React, { useState, useCallback } from "react";
import ReactFlow, { 
  ReactFlowProvider, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from './components/CustomNode';
import Modal from './components/Modal';
import { LANE_HEIGHT, NODE_WIDTH, HORIZONTAL_SPACING, START_X, START_Y } from './constants';
import { PROCESS_CONFIG } from './processConfig';

// Hide connection handles and add hover effects
const hideHandlesStyle = document.createElement('style');
hideHandlesStyle.innerHTML = `
  .react-flow__handle {
    opacity: 0 !important;
    pointer-events: none !important;
  }
  
  .swimlane-label-clickable:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.4) !important;
    filter: brightness(1.15) !important;
  }
  
  .process-header-clickable:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
    filter: brightness(1.15) !important;
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('hide-handles')) {
  hideHandlesStyle.id = 'hide-handles';
  document.head.appendChild(hideHandlesStyle);
}

const nodeTypes = { custom: CustomNode };

function FlowComponent() {
  const [modalMarkdown, setModalMarkdown] = useState(null);
  const [modalLabel, setModalLabel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMarkdown = async (mdFile, label, folder = 'tasks') => {
    // If mdFile is empty or not provided, show placeholder
    if (!mdFile || mdFile.trim() === '') {
      setModalMarkdown(null);
      setModalLabel(label);
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/${folder}/${mdFile}`);
      if (response.ok) {
        const text = await response.text();
        // Check if we got actual markdown content or HTML error page
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          // Got HTML instead of markdown - file doesn't exist
          setModalMarkdown(null);
        } else {
          setModalMarkdown(text);
        }
      } else {
        setModalMarkdown(null);
      }
      setModalLabel(label);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error loading markdown:', error);
      setModalMarkdown(null);
      setModalLabel(label);
      setIsModalOpen(true);
    }
  };

  const generateNodesAndEdges = () => {
    const nodes = [];
    const edges = [];
    
    const maxCol = PROCESS_CONFIG.flow.reduce((max, step) => Math.max(max, step.col), 0);
    const swimlaneWidth = (maxCol * (NODE_WIDTH + HORIZONTAL_SPACING)) + 300;
    
    // Group processes by column (used for both headers and edges)
    const columnGroups = {};
    PROCESS_CONFIG.flow.forEach(step => {
      if (!columnGroups[step.col]) {
        columnGroups[step.col] = [];
      }
      columnGroups[step.col].push(step);
    });
    
    const columns = Object.keys(columnGroups).map(Number).sort((a, b) => a - b);
    
    // Add process phase headers (column headers)
    // Calculate center position based on actual task boxes in each column
    columns.forEach((col, colIndex) => {
      // Find any task box in this column to get the actual X position
      const sampleTask = columnGroups[col][0];
      const taskColIndex = sampleTask.col - 1;
      
      // Calculate task box position (same logic as task generation)
      const taskX = START_X + (taskColIndex * (NODE_WIDTH + HORIZONTAL_SPACING));
      const taskCenterX = taskX + (NODE_WIDTH / 2);
      
      // Position header to align with task boxes (same X position)
      const headerX = taskX; // Same as task box
      const headerY = START_Y - 80;
      
      // Add alternating column background shading centered on tasks
      const isEvenColumn = colIndex % 2 === 0;
      const bgWidth = NODE_WIDTH + HORIZONTAL_SPACING;
      const bgX = taskCenterX - (bgWidth / 2);
      
      nodes.push({
        id: `column-bg-${col}`,
        type: 'default',
        position: { x: bgX, y: START_Y - 60 },
        data: { label: '' },
        draggable: false,
        selectable: false,
        style: {
          background: isEvenColumn ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
          border: 'none',
          borderLeft: '1px dashed #d1d5db',
          borderRight: '1px dashed #d1d5db',
          width: `${bgWidth}px`,
          height: `${PROCESS_CONFIG.swimLanes.length * LANE_HEIGHT + 60}px`,
          pointerEvents: 'none',
          zIndex: -2,
        },
      });
      
      nodes.push({
        id: `phase-header-${col}`,
        type: 'default',
        position: { x: headerX, y: headerY },
        data: { label: `Process ${String.fromCharCode(64 + col)}` }, // A, B, C, etc.
        draggable: false,
        selectable: false,
        style: {
          background: '#1f2937',
          color: 'white',
          border: '2px solid #374151',
          borderRadius: '8px',
          fontWeight: 'bold',
          padding: '10px 20px',
          minWidth: `${NODE_WIDTH}px`, // Match task box inner width
          maxWidth: `${NODE_WIDTH}px`,
          textAlign: 'center',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          boxSizing: 'border-box', // Include padding/border in width calculation
        },
      });
    });
    
    PROCESS_CONFIG.swimLanes.forEach((lane, idx) => {
      nodes.push({
        id: `lane-bg-${lane.id}`,
        type: 'default',
        position: { x: -200, y: START_Y + (idx * LANE_HEIGHT) },
        data: { label: '' },
        draggable: false,
        selectable: false,
        style: {
          background: 'transparent',
          border: 'none',
          borderTop: '2px solid #cbd5e1',
          borderBottom: '2px solid #cbd5e1',
          width: `${swimlaneWidth}px`,
          height: `${LANE_HEIGHT}px`,
          pointerEvents: 'none',
          zIndex: -1,
        },
      });
    });
    
    PROCESS_CONFIG.swimLanes.forEach((lane, idx) => {
      nodes.push({
        id: `lane-label-${lane.id}`,
        type: 'default',
        position: { x: -225, y: START_Y + (idx * LANE_HEIGHT) },
        data: { label: lane.label },
        draggable: false,
        selectable: true,
        style: {
          background: lane.color,
          color: 'white',
          border: '2px solid white',
          borderRadius: '8px',
          fontWeight: 'bold',
          padding: '0',
          width: '195px',
          height: `${LANE_HEIGHT}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
        className: 'swimlane-label-clickable',
      });
    });
    
    PROCESS_CONFIG.flow.forEach((step, idx) => {
      const rowIndex = step.row - 1;
      const colIndex = step.col - 1;
      const lane = PROCESS_CONFIG.swimLanes[rowIndex];
      
      const x = START_X + (colIndex * (NODE_WIDTH + HORIZONTAL_SPACING));
      const y = START_Y + (rowIndex * LANE_HEIGHT) + (LANE_HEIGHT / 2) - 45;

      nodes.push({
        id: step.id,
        type: 'custom',
        position: { x, y },
        data: { 
          label: step.label,
          color: lane.color,
          swimlaneName: lane.label,
          onClick: () => loadMarkdown(step.mdFile, step.label),
        },
        draggable: false,
      });
    });

    // Generate edges with smart routing - only connect primary tasks
    // For each column, connect primary tasks to next column's primary task
    columns.forEach((col, colIndex) => {
      if (colIndex < columns.length - 1) {
        const currentColumnBoxes = columnGroups[col];
        const nextCol = columns[colIndex + 1];
        const nextColumnBoxes = columnGroups[nextCol];
        
        // Find primary task(s) in current column
        const primaryBoxes = currentColumnBoxes.filter(box => box.primary);
        
        // Find primary task in next column
        const nextPrimaryBox = nextColumnBoxes.find(box => box.primary);
        
        // If no primary marked, use first box as default
        const sourceTasks = primaryBoxes.length > 0 ? primaryBoxes : [currentColumnBoxes[0]];
        const targetTask = nextPrimaryBox || nextColumnBoxes[0];
        
        // Connect primary tasks
        sourceTasks.forEach(sourceBox => {
          const sameRow = sourceBox.row === targetTask.row;
          const targetAbove = targetTask.row < sourceBox.row;
          
          let edgeConfig = {
            id: `e-${sourceBox.id}-${targetTask.id}`,
            source: sourceBox.id,
            target: targetTask.id,
            animated: false,
            style: { stroke: '#000000', strokeWidth: 2 },
            markerEnd: {
              type: 'arrowclosed',
              color: '#000000',
            },
          };
          
          if (sameRow) {
            // Same row - straight horizontal
            edgeConfig.sourceHandle = 'right';
            edgeConfig.targetHandle = 'left';
            edgeConfig.type = 'straight';
          } else if (targetAbove) {
            // Target is above - go right then up
            edgeConfig.sourceHandle = 'right';
            edgeConfig.targetHandle = 'left';
            edgeConfig.type = 'smoothstep';
          } else {
            // Target is below - go right then down
            edgeConfig.sourceHandle = 'right';
            edgeConfig.targetHandle = 'left';
            edgeConfig.type = 'smoothstep';
          }
          
          edges.push(edgeConfig);
        });
      }
    });

    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges();
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback((event, node) => {
    // Check if it's a process phase header
    if (node.id.startsWith('phase-header-')) {
      const col = parseInt(node.id.replace('phase-header-', ''));
      const processPhase = PROCESS_CONFIG.processPhases?.find(p => p.col === col);
      if (processPhase && processPhase.mdFile) {
        loadMarkdown(processPhase.mdFile, processPhase.name, 'processes');
      }
      return;
    }
    
    // Check if it's a swimlane label
    if (node.id.startsWith('lane-label-')) {
      const laneId = node.id.replace('lane-label-', '');
      const lane = PROCESS_CONFIG.swimLanes.find(l => l.id === laneId);
      if (lane) {
        loadMarkdown(lane.deptMdFile || '', lane.label, 'departments');
      }
    }
  }, []);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          background: 'white',
          padding: '15px 20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 5
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#1f2937' }}>
            Company Process Flow - Cradle to Grave
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
            Click any step to view detailed documentation • Markdown-powered content
          </p>
        </div>

        <div style={{ flex: 1, background: '#f8fafc' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            onNodeClick={handleNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.1}
            maxZoom={2}
            zoomOnDoubleClick={false}
          >
            <Background color="#e2e8f0" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        markdownContent={modalMarkdown}
        processLabel={modalLabel}
      />
    </>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  );
}

export default App;