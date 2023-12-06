import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

// eslint-disable-next-line no-unused-vars
const NewSearchBar = ({ userInput, onUserInput, onSendMessage, onKeyDown }) => {
  const [newUserInput, setNewUserInput] = useState('');

  const handleNewUserInput = (e) => {
    setNewUserInput(e.target.value);
    onUserInput(e); // Pass the event to the parent component if needed
  };

  return (
    <InputGroup className="mb-3 search-bar-input-group py-3">
      <Form.Control
        placeholder="Ask another question..."
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={newUserInput}
        onChange={handleNewUserInput}
        onKeyDown={onKeyDown}
      />
      <InputGroup.Text id="btn-group">
        <Button onClick={() => onSendMessage(newUserInput)} variant="light">
          <Search />
        </Button>
      </InputGroup.Text>
    </InputGroup>
  );
};

NewSearchBar.propTypes = {
  userInput: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default NewSearchBar;
