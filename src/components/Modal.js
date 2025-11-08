import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Modal.css';

const Modal = ({ isOpen, onClose, markdownContent, processLabel }) => {
  // Add escape key listener
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{processLabel}</h2>
          <button onClick={onClose} className="modal-close-btn">
            ✕
          </button>
        </div>

        {/* Scrollable Markdown Body */}
        <div className="modal-body">
          {markdownContent ? (
            <ReactMarkdown
              components={{
                h1: ({node, children, ...props}) => <h1 className="md-h1" {...props}>{children}</h1>,
                h2: ({node, children, ...props}) => <h2 className="md-h2" {...props}>{children}</h2>,
                h3: ({node, children, ...props}) => <h3 className="md-h3" {...props}>{children}</h3>,
                p: ({node, ...props}) => <p className="md-p" {...props} />,
                ul: ({node, ...props}) => <ul className="md-ul" {...props} />,
                ol: ({node, ...props}) => <ol className="md-ol" {...props} />,
                li: ({node, ...props}) => <li className="md-li" {...props} />,
                a: ({node, children, ...props}) => <a className="md-a" {...props}>{children}</a>,
                strong: ({node, ...props}) => <strong className="md-strong" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? 
                    <code className="md-code-inline" {...props} /> :
                    <code className="md-code-block" {...props} />
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <div className="modal-placeholder">
              <p className="placeholder-title">📝 Documentation in progress</p>
              <p className="placeholder-text">This process documentation will be added soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;