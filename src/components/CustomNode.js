import React from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomNode = ({ data }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="custom-node-wrapper">
      <div
        className="custom-node"
        style={{ background: data.color }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (data.onClick) {
            data.onClick();
          }
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Handle type="target" position={Position.Left} className="node-handle" />
        <span>{data.label}</span>
        <Handle type="source" position={Position.Right} className="node-handle" />
      </div>
      
      {/* Tooltip */}
      {showTooltip && data.swimlaneName && (
        <div className="node-tooltip">
          {data.swimlaneName}
          <div className="tooltip-arrow" />
        </div>
      )}
    </div>
  );
};

export default CustomNode;