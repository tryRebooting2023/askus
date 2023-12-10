import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import BackToLandingButton from '../components/BackToChatPageButton';

/* A simple static component to render some text for the landing page. */
const Tutorial = () => (
  <Container id="tutorial-page" className="py-3">
    <Row className="mb-4">
      <Col className="text-center"><h1>Ask Us Features</h1></Col>
    </Row>
    <Row className="mb-4 text-center text-bg-secondary">
      <h2>Chat/Landing Page</h2>
    </Row>
    <Row className="mb-4">
      <Col>
        <Image fluid src="/images/landing-page-1.png" width="800px" className="img-fluid" />
      </Col>
      <Col className="align-content-center justify-content-center">
        <ul>
          <li>
            <p>Start by typing your IT related question in the search bar, then either clicking the Search icon or the ‘Enter’ button on your keyboard.
            </p>
          </li>
          <li>
            <p>This loading spinner message will appear under your message as the answers are being generated.</p>
          </li>
          <Image fluid src="/images/landing-page-2.png" width="200px" className="img-fluid" />
        </ul>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col>
        <Image fluid src="/images/landing-page-4.png" width="800px" className="img-fluid" />
      </Col>
      <Col>
        <ul>
          <li>
            <p>The answer that best matches your question appears in a chat/message style, right under your question.
            </p>
          </li>
          <li>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>"Related Article Links" will show up.</p>
          </li>
          <li>
            <p>Feel free to ask another question or explore the answer by clicking on the link.</p>
          </li>
        </ul>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col>
        <Image fluid src="/images/article-site-example.png" width="800px" className="img-fluid" />
      </Col>
      <Col>
        <ul>
          <li>
            <p>This is what the article site will look like, a more detailed branch of the answer.
            </p>
          </li>
          <li>
            <p>Hitting the backspace button on your browser will return you to the chat page.</p>
          </li>
        </ul>
      </Col>
    </Row>
    <Row className="mb-4">
      <BackToLandingButton />
    </Row>

    <Row className="mb-4 text-center text-bg-secondary">
      <h2>Navigation Bar</h2>
    </Row>
    <Row className="justify-content-center align-content-center mb-4">
      <Col className="justify-content-center align-content-center text-center">
        <Image src="/images/analytics-page.png" width="300px" className="img-fluid" />
      </Col>
      <Col className="justify-content-center align-content-center text-center">
        <Image src="/images/new-dropdown-toggle.png" width="180px" className="img-fluid" />
      </Col>
      <Col className="justify-content-center align-content-center text-center">
        <Image src="/images/toggle-sign-in-out.png" width="250px" className="img-fluid" />
      </Col>
    </Row>
    <Row className="mb-5 justify-content-sm-evenly">
      <Col className="justify-content-center text-center">
        <h4>Analytics Page</h4>
        <p>Exclusively for IT admin to view popular searches.
        </p>
      </Col>
      <Col className="justify-content-center text-center">
        <h4>Toggle Dropdown</h4>
        <p>Conveniently switch between pages, anywhere on the site.
        </p>
      </Col>
      <Col className="justify-content-center text-center">
        <h4>Login Dropdown</h4>
        <p>Sign in or create an account to save past searches.
        </p>
      </Col>
    </Row>
  </Container>
);

export default Tutorial;
