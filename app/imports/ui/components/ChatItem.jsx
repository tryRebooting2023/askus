import React from 'react';
import PropTypes from 'prop-types';

const ChatItem = ({ content, role, sources, titles }) => {
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
          {sources.map((link, key) => <li><a href={link}>{titles.map((title, index) => (key === index ? <div>{title}</div> : ''))}</a></li>)}
        </ul>
      )}
    </div>
  );
};

// Require a document to be passed to this component.
ChatItem.propTypes = {
  content: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  // eslint-disable-next-line react/require-default-props
  sources: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/require-default-props
  titles: PropTypes.arrayOf(PropTypes.string),
};

export default ChatItem;
