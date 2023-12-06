import { Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import ResponseChatItem from './ResponseChatItem';
import LoadingSpinner from './LoadingSpinner';
import UserChatItem from './UserChatItem';
import NewSearchBar from './NewSearchBar';

const ITSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [hasUsedInput, setHasUsedInput] = useState(false);
  const [showNewSearchBar, setShowNewSearchBar] = useState(false);
  const [newUserInput, setNewUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello and welcome to Ask Us! How can I assist you today?', sources: null, titles: null, scores: null, isLoading: false },
  ]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleNewUserInput = (e) => {
    setNewUserInput(e.target.value);
  };
  // Call the useEffect hook to set up a listener on the chatMessages array
  useEffect(() => {
    // Scroll to the bottom of the page when chatMessages change
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatMessages]); // Add chatMessages as a dependency

  const handleSendMessage = () => {
    const currentInput = hasUsedInput ? newUserInput : userInput;

    // If the user did not enter any text, do nothing
    if (currentInput.trim() === '') {
      return;
    }

    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { role: 'user', content: currentInput, isLoading: true },
    ]);

    setInputDisabled(true);

    let currentUser = Meteor.userId();
    if (currentUser === null) {
      currentUser = 'anonymous';
    }

    Meteor.call('getChatResponse', currentUser, currentInput, (error, response) => {
      if (!error) {
        setChatMessages(prevChatMessages => [
          ...prevChatMessages.slice(0, -1),
          { ...prevChatMessages[prevChatMessages.length - 1], isLoading: false },
          { role: 'assistant', content: response.chatResponse, sources: response.linkArray, titles: response.titleArray, scores: response.scoreArray, isLoading: false },
        ]);

        setInputDisabled(false);
        setHasUsedInput(true);
        setNewUserInput('');
        setShowNewSearchBar(true);
      } else {
        console.error(error);
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container id="search" className="container-fluid">
      <Row id="centerText" className="align-items-center justify-content-center campus-background mt-5 pt-5">
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
          <InputGroup className="mb-3 search-bar-input-group py-3">
            <Form.Control
              id="search-bar"
              placeholder="Ask a question (Ex: What is DUO?)"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
              disabled={inputDisabled || (hasUsedInput && showNewSearchBar)}
            />
            <InputGroup.Text id="btn-group">
              <Button onClick={handleSendMessage} id="query-submit" variant="light" disabled={inputDisabled || (hasUsedInput && showNewSearchBar)}><Search /></Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-start pt-3">
          {chatMessages.map((chat, index) => (
            <React.Fragment key={index}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {chat.isLoading ? (
                <LoadingSpinner />
              ) : chat.role === 'user' ? (
                <UserChatItem content={chat.content} />
              ) : (
                <>
                  <ResponseChatItem
                    content={chat.content}
                    sources={chat.sources}
                    titles={chat.titles}
                    scores={chat.scores}
                  />
                  {showNewSearchBar && index === chatMessages.length - 1 && (
                    <NewSearchBar
                      userInput={newUserInput}
                      onUserInput={handleNewUserInput}
                      onSendMessage={handleSendMessage}
                      onKeyDown={handleKeyDown}
                      disabled={inputDisabled}
                    />
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ITSearch;
