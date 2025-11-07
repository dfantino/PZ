import React, { useState } from "react";
import ReactFlow, { 
  ReactFlowProvider, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from "reactflow";
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
// Modal Component
// ==========================================
const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

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
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
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
          borderBottom: '1px solid #e5e7eb',
          flexShrink: 0
        }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>{data.title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: 0,
              width: '32px',
              height: '32px',
              lineHeight: '32px'
            }}
          >
            ×
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ 
          padding: '30px', 
          overflowY: 'auto',
          flex: 1
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Description</h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>{data.description}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Duration</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>{data.duration}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Roles Involved</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.roles.map((role, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Deliverables</h3>
            <ul style={{ color: '#6b7280', lineHeight: '1.8', marginLeft: '20px', margin: '0 0 0 20px' }}>
              {data.deliverables.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {data.links && data.links.length > 0 && (
            <div>
              <h3 style={{ color: '#374151', fontSize: '16px', marginBottom: '8px' }}>Related Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#2563eb',
                      textDecoration: 'none',
                      padding: '8px 12px',
                      background: '#f3f4f6',
                      borderRadius: '6px',
                      display: 'inline-block',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  >
                    {link.text} →
                  </a>
                ))}
              </div>
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
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      // Row 1 = index 0, Row 2 = index 1, etc.
      const rowIndex = step.row - 1;
      const colIndex = step.col - 1;
      const lane = PROCESS_CONFIG.swimLanes[rowIndex];
      
      const x = START_X + (colIndex * (NODE_WIDTH + HORIZONTAL_SPACING));
      // Center the node vertically in the lane (adjusted for taller boxes)
      const y = START_Y + (rowIndex * LANE_HEIGHT) + (LANE_HEIGHT / 2) - 45; // 45 accounts for ~60px tall boxes plus padding

      nodes.push({
        id: step.id,
        type: 'custom',
        position: { x, y },
        data: { 
          label: step.label,
          color: lane.color,
          onClick: () => {
            setModalData(step.modalData);
            setIsModalOpen(true);
          }
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
            Click any step to view detailed information • Flow automatically connects in order
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
        data={modalData}
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