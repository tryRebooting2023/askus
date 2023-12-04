import { Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import ChatItem from './ChatItem';
import LoadingSpinner from './LoadingSpinner';

const ITSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showNewSearchBar, setShowNewSearchBar] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello and welcome to Ask Us! How can I assist you today?', sources: null, titles: null, scores: null, isLoading: false },
  ]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (userInput.trim() === '') {
      return;
    }

    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { role: 'user', content: userInput, isLoading: true },
    ]);

    setInputDisabled(true);
    setUserInput('');

    let currentUser = Meteor.userId();
    if (currentUser === null) {
      currentUser = 'anonymous';
    }

    Meteor.call('getChatResponse', currentUser, userInput, (error, response) => {
      if (!error) {
        setChatMessages(prevChatMessages => [
          ...prevChatMessages.slice(0, -1),
          { ...prevChatMessages[prevChatMessages.length - 1], isLoading: false },
          { role: 'assistant', content: response.chatResponse, sources: response.linkArray, titles: response.titleArray, scores: response.scoreArray, isLoading: false },
        ]);

        setInputDisabled(false);
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
          <InputGroup className="mb-3 search-bar-input-group py-3">
            <Form.Control
              id="search-bar"
              placeholder="Ask a question (Ex: What is DUO?)"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={userInput}
              onChange={handleUserInput}
              onKeyDown={handleKeyDown}
              disabled={inputDisabled}
            />
            <InputGroup.Text id="btn-group">
              <Button onClick={handleSendMessage} id="query-submit" variant="light"><Search /></Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-start pt-3">
          {chatMessages.map((chat, index) => (
            chat.isLoading ? (
              <LoadingSpinner key={index} />
            ) : (
              <React.Fragment key={index}>
                <ChatItem content={chat.content} role={chat.role} sources={chat.sources} titles={chat.titles} scores={chat.scores} key={index} />
                {showNewSearchBar && index === chatMessages.length - 1 && (
                  <InputGroup className="mb-3 search-bar-input-group py-3">
                    <Form.Control
                      id={`new-search-bar-${index}`}
                      placeholder="Ask another question..."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={userInput}
                      onChange={handleUserInput}
                      onKeyDown={handleKeyDown}
                      disabled={inputDisabled}
                    />
                    <InputGroup.Text id={`btn-group-${index}`}>
                      <Button onClick={handleSendMessage} id={`query-submit-${index}`} variant="light">
                        <Search />
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>
                )}
              </React.Fragment>
            )
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ITSearch;
