import React from 'react';
import PropTypes from 'prop-types';

const ResponseChatItem = ({ content, sources, titles, scores }) => {
  const containerStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    overflow: 'auto',
    maxHeight: '300px', // Adjust the maximum height as needed
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.1)',
    resize: 'vertical', // Enable vertical resizing only
    minWidth: '100px',
    minHeight: '50px',
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
  const listItems = uniqueSources.flatMap((link, key) => (
    uniqueTitles.map((title, index) => {
      if (key === index && scores[index] >= 0.8) {
        return (
          <li key={key}>
            <a href={link}>
              <div className="reference-link">{title}</div>
            </a>
          </li>
        );
      }
      return null;
    })
  )).filter(item => item !== null); // Get rid of null indices
  return (
    <div>
      <div style={containerStyle} contentEditable="true">
        {content}
      </div>
      { listItems.length !== 0 ? (
        <div className="body.dark-sources" style={sourceContainerStyle}>
          <ul className="pt-3">
            Related Article Links:
            {listItems}
          </ul>
        </div>
      ) : ''}
    </div>
  );
};

// Require a document to be passed to this component.
ResponseChatItem.propTypes = {
  content: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  sources: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/require-default-props
  titles: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/require-default-props
  scores: PropTypes.arrayOf(PropTypes.number),
};

export default ResponseChatItem;
