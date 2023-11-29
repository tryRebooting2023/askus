import React from 'react';
import PropTypes from 'prop-types';

const UserChatItem = ({ content }) => {
  const containerStyle = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    overflowY: 'auto',
    maxHeight: '200px',
    boxShadow: '0px 7px 8px rgba(0, 0, 0, 0.1)',
  };
  return (
    <div>
      <div style={containerStyle} contentEditable="true">
        {content}
      </div>
    </div>
  );
};

// Require a document to be passed to this component.
UserChatItem.propTypes = {
  content: PropTypes.string.isRequired,
};

export default UserChatItem;
