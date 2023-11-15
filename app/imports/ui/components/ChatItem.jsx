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

  const uniqueSources = [...new Set(sources)];
  const uniqueTitles = [...new Set(titles)];

  const listItems = uniqueSources.map((link, key) => (
    <li key={key}>
      <a href={link}>
        {uniqueTitles.map((title, index) => {
          if (key === index) {
            return <div key={index}>{title}</div>;
          }
          return null;
        })}
      </a>
    </li>
  ));
  return (
    <div style={containerStyle}>
      {content}
      {haveSources() && role === 'assistant' && (
        <ul className="pt-3">
          Related Article Links:
          {listItems}
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
