import React from 'react';
import PropTypes from 'prop-types';

const ChatItem = ({ content, role, sources, titles }) => {
  const userBackgroundColor = 'gray';
  const assistantBackgroundColor = 'green';

  const containerStyle = {
    backgroundColor: role === 'user' ? userBackgroundColor : assistantBackgroundColor,
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '200px', // Adjust the maximum height as needed
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.1)',
  };

  const sourceContainerStyle = {
    backgroundColor: 'transparent',
    padding: '10px',
    marginTop: '10px', // Add some margin between the response and sources
    borderRadius: '5px',
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '200px', // Adjust the maximum height as needed
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
            return <div key={index} className="reference-link">{title}</div>;
          }
          return null;
        })}
      </a>
    </li>
  ));
  return (
    <div>
      <div style={containerStyle}>
        {content}
      </div>
      {haveSources() && role === 'assistant' && (
        <div className="body.dark-sources" style={sourceContainerStyle}>
          <ul className="pt-3">
            Related Article Links:
            {listItems}
          </ul>
        </div>
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
