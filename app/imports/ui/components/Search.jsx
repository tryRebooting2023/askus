import { Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import ChatItem from './ChatItem';
import LoadingSpinner from './LoadingSpinner';
import DarkModeToggle from './DarkToggleMode';

const ITSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello and welcome to Ask Us! How can I assist you today?', sources: null, titles: null, isLoading: false },
  ]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    // If the user did not enter any text, do nothing
    if (userInput.trim() === '') {
      return;
    }
    // Add the user's message to the chatMessages array
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { role: 'user', content: userInput, isLoading: true },
    ]);
    // Get the current user's ID
    let currentUser = Meteor.userId();
    // If the user is not logged in, set their ID to 'anonymous'
    if (currentUser === null) {
      currentUser = 'anonymous';
    }
    // Send the user's message and session ID to the server using the getChatResponse method
    Meteor.call('getChatResponse', currentUser, userInput, (error, response) => {
      if (!error) {
        // Add the response from OpenAI to the chatMessages array
        setChatMessages(prevChatMessages => [
          ...prevChatMessages.slice(0, -1), // All messages except the last one (being rendered)
          { ...prevChatMessages[prevChatMessages.length - 1], isLoading: false }, // Ensure last message is no longer loading
          { role: 'assistant', content: response.chatResponse, sources: response.linkArray, titles: response.titleArray, isLoading: false },
        ]);
      } else {
        console.error(error);
      }
    });

    // Clear the search bar
    setUserInput('');
  };

  const handleKeyDown = (e) => {
    // Check if the pressed key is Enter
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior of the enter key (e.g., form submission)
      handleSendMessage(); // Call your sendMessage function
    }
  };

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="p-1"><h1>Virtual Help Desk</h1></Row>
      <Row className="align-middle">
        <Col xs={4}>
          <InputGroup className="mb-3 search-bar-input-group">
            <Form.Control
              placeholder="Ask a question"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
            />
            <InputGroup.Text id="btn-group">
              <Button onClick={handleSendMessage} variant="light"><Search /></Button>
            </InputGroup.Text>
          </InputGroup>
          <DarkModeToggle />
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-start">
          {chatMessages.map((chat, index) => (
            chat.isLoading ?
              <LoadingSpinner key={index} /> :
              <ChatItem content={chat.content} role={chat.role} sources={chat.sources} titles={chat.titles} key={index} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ITSearch;
