import { Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import ChatItem from './ChatItem';
import LoadingSpinner from './LoadingSpinner';

const ITSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello and welcome to Ask Us! How can I assist you today?' },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    // Set the isProcessing flag to true when starting the chatbot request
    setIsProcessing(true);
    // Add the user's message to the chatMessages array
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { role: 'user', content: userInput },
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
        setChatMessages((prevChatMessages) => [
          ...prevChatMessages,
          { role: 'assistant', content: response.chatResponse },
        ]);
      } else {
        console.error(error);
      }
      // Set isProcessing to false to indicate that the request is complete
      setIsProcessing(false);
    });

    // Clear the search bar
    setUserInput('');
  };

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle">
        <Col xs={4}>
          <InputGroup className="mb-3 search-bar-input-group">
            <Form.Control
              placeholder="Ask a question"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={userInput}
              onChange={handleUserInput}
            />
            <InputGroup.Text id="btn-group">
              <Button onClick={handleSendMessage}><Search /></Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-start">
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Col>
      </Row>
      {isProcessing && (
        <Row className="justify-content-md-center">
          <LoadingSpinner animation="border" />
        </Row>
      )}
    </Container>
  );
};

export default ITSearch;
