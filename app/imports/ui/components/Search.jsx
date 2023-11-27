import { Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import ResponseChatItem from './ResponseChatItem';
import LoadingSpinner from './LoadingSpinner';
import UserChatItem from './UserChatItem';

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
    <Container id="search" className="container-fluid">
      <Row id="centerText" className="align-items-center justify-content-center campus-background">
        <Col xs={8} className="text-center">
          <br />
          <br />
          <br />
          <h1>Ask Us</h1>
          <h6>A searchable knowledge base of frequently asked questions (FAQs) related to information technology.</h6>
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row className="align-middle">
        <Col xs={4}>
          <InputGroup className="mb-3 search-bar-input-group">
            <Form.Control
              id="search-bar"
              placeholder="Ask a question (Ex: What is DUO?)"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
            />
            <InputGroup.Text id="btn-group">
              <Button onClick={handleSendMessage} id="query-submit" variant="light"><Search /></Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-start">
          {chatMessages.map((chat, index) => (
            // eslint-disable-next-line no-nested-ternary
            chat.isLoading ?
              <LoadingSpinner key={index} /> : chat.role === 'user' ?
                <UserChatItem content={chat.content} key={index} /> :
                <ResponseChatItem content={chat.content} sources={chat.sources} titles={chat.titles} key={index} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ITSearch;
