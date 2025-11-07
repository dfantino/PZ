import React, { useState, useEffect } from "react";
import ReactFlow, { 
  ReactFlowProvider, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from "reactflow";
import ReactMarkdown from 'react-markdown';
import "reactflow/dist/style.css";
import { LANE_HEIGHT, NODE_WIDTH, HORIZONTAL_SPACING, START_X, START_Y, PROCESS_CONFIG } from './processConfig';

// Hide connection handles but keep edges visible
const hideHandlesStyle = document.createElement('style');
hideHandlesStyle.innerHTML = `
  .react-flow__handle {
    opacity: 0 !important;
    pointer-events: none !important;
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('hide-handles')) {
  hideHandlesStyle.id = 'hide-handles';
  document.head.appendChild(hideHandlesStyle);
}

// ==========================================
// Custom Node Component
// ==========================================
const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: '15px 25px',
        borderRadius: '8px',
        background: data.color,
        color: 'white',
        border: '2px solid white',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.2s',
        minWidth: '150px',
        maxWidth: '150px',
        minHeight: '60px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '1.3'
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (data.onClick) {
          data.onClick();
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0, pointerEvents: 'none' }} />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Right} style={{ opacity: 0, pointerEvents: 'none' }} />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

// ==========================================
// Modal Component with Markdown Support
// ==========================================
const Modal = ({ isOpen, onClose, markdownContent, processLabel }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '24px 30px',
          borderBottom: '2px solid #e5e7eb',
          flexShrink: 0,
          backgroundColor: '#f9fafb'
        }}>
          <h2 style={{ margin: 0, color: '#1f2937', fontSize: '20px' }}>{processLabel}</h2>
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Markdown Body */}
        <div 
          style={{ 
            padding: '30px', 
            overflowY: 'auto',
            flex: 1,
            lineHeight: '1.6'
          }}
          className="markdown-content"
        >
          {markdownContent ? (
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 style={{ fontSize: '28px', marginBottom: '16px', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: '22px', marginTop: '24px', marginBottom: '12px', color: '#374151' }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: '18px', marginTop: '20px', marginBottom: '10px', color: '#4b5563' }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: '12px', color: '#6b7280' }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginLeft: '20px', marginBottom: '12px', color: '#6b7280' }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ marginLeft: '20px', marginBottom: '12px', color: '#6b7280' }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: '6px' }} {...props} />,
                a: ({node, ...props}) => <a style={{ color: '#2563eb', textDecoration: 'underline' }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ fontWeight: 'bold', color: '#1f2937' }} {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? 
                    <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '14px' }} {...props} /> :
                    <code style={{ display: 'block', backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '6px', fontSize: '14px', overflowX: 'auto' }} {...props} />
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>📝 Documentation in progress</p>
              <p style={{ fontSize: '14px' }}>This process documentation will be added soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Main Component
// ==========================================
function FlowComponent() {
  const [modalMarkdown, setModalMarkdown] = useState(null);
  const [modalLabel, setModalLabel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to load markdown file
  const loadMarkdown = async (mdFile, label) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/processes/${mdFile}`);
      if (response.ok) {
        const text = await response.text();
        setModalMarkdown(text);
      } else {
        setModalMarkdown(null); // File not found, show placeholder
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

  // Convert config to ReactFlow nodes and edges
  const generateNodesAndEdges = () => {
    const nodes = [];
    const edges = [];
    
    // Add swimlane background rectangles
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
          width: '2000px',
          height: `${LANE_HEIGHT}px`,
          pointerEvents: 'none',
          zIndex: -1,
        },
      });
    });
    
    // Add swimlane label nodes on the left
    PROCESS_CONFIG.swimLanes.forEach((lane, idx) => {
      nodes.push({
        id: `lane-label-${lane.id}`,
        type: 'default',
        position: { x: -225, y: START_Y + (idx * LANE_HEIGHT) },
        data: { label: lane.label },
        draggable: false,
        selectable: false,
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
        },
      });
    });
    
    // Create process nodes using row/column grid positioning
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
          onClick: () => loadMarkdown(step.mdFile, step.label)
        },
        draggable: false,
      });

      // Create edge to next step in flow
      if (idx < PROCESS_CONFIG.flow.length - 1) {
        edges.push({
          id: `e-${step.id}-${PROCESS_CONFIG.flow[idx + 1].id}`,
          source: step.id,
          target: PROCESS_CONFIG.flow[idx + 1].id,
          animated: false,
          style: { stroke: '#94a3b8', strokeWidth: 2 },
          type: 'smoothstep',
          markerEnd: {
            type: 'arrowclosed',
            color: '#94a3b8',
          },
        });
      }
    });

    return { nodes, edges };
  };

  const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges();
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
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

        {/* ReactFlow Canvas */}
        <div style={{ flex: 1, background: '#f8fafc' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            fitView
            fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
            zoomOnDoubleClick={false}
          >
            <Background color="#e2e8f0" />
            <Controls />
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