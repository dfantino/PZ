import React from 'react';
import './ProcessHeader.css';

const ProcessHeader = ({ data }) => {
  return (
    <div
      className="process-header"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (data.onClick) {
          data.onClick();
        }
      }}
    >
      {data.label}
    </div>
  );
};

export default ProcessHeader;