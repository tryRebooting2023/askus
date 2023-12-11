import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer">
    <Container className="pt-4">
      <Row>
        <Col>
          <hr />
          <Row className="text-center">
            <p>This website was created by the <a href="https://tryrebooting2023.github.io/" target="_blank" rel="noopener noreferrer">HACC 2023 TryRebooting team</a> in
              coordination with the University of Hawaii Information Technology Services (ITS) department.
              As this is a student team, we appreciate any feedback you may have for us.
              Please feel free to fill out the following form to provide us with your feedback: <a href="https://forms.gle/eRbTbcg6itxbn7MD8" target="_blank" rel="noopener noreferrer">AskUs Google Form</a>
              . Please contact the official ITS team with any other questions or concerns at: <a href="https://www.hawaii.edu/its/contact/">Contact ITS.</a>
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
