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

// Hide connection handles but keep edges visible
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

  const loadMarkdown = async (mdFile, label, folder = 'processes') => {
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

    PROCESS_CONFIG.flow.forEach((step, idx) => {
      if (idx < PROCESS_CONFIG.flow.length - 1) {
        edges.push({
          id: `e-${step.id}-${PROCESS_CONFIG.flow[idx + 1].id}`,
          source: step.id,
          target: PROCESS_CONFIG.flow[idx + 1].id,
          animated: false,
          style: { stroke: '#000000', strokeWidth: 2 },
          type: 'smoothstep',
          markerEnd: {
            type: 'arrowclosed',
            color: '#000000',
          },
        });
      }
    });

    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges();
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback((event, node) => {
    // Check if it's a swimlane label
    if (node.id.startsWith('lane-label-')) {
      const laneId = node.id.replace('lane-label-', '');
      const lane = PROCESS_CONFIG.swimLanes.find(l => l.id === laneId);
      if (lane) {
        // Pass empty string if deptMdFile doesn't exist to trigger placeholder
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