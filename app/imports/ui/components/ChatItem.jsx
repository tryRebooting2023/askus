import React from 'react';
import PropTypes from 'prop-types';
import Source from './Source';

const ChatItem = ({ content, role, sources }) => {
  const userBackgroundColor = 'lightblue';
  const assistantBackgroundColor = 'lightgreen';

  const containerStyle = {
    backgroundColor: role === 'user' ? userBackgroundColor : assistantBackgroundColor,
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  function haveSources() {
    return sources !== null;
  }
  return (
    <div style={containerStyle}>
      {content}
      {haveSources() && role === 'assistant' && (
        <ul className="pt-3" key="source-links">
          Related Article Links:
          {sources.map((link) => <li>{link}</li>)}
        </ul>
      )}
    </div>
  );
};

// Require a document to be passed to this component.
ChatItem.propTypes = {
  content: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  sources: PropTypes.arrayOf(PropTypes.string),
};

export default ChatItem;
