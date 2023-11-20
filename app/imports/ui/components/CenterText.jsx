import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CenterText = () => (
  <Row id="centerText" className="align-items-center justify-content-center">
    <Col xs={8} className="text-center">
      <h1>Ask Us</h1>
      <h3>Ask Us is a knowledge base of frequently asked questions (FAQs) related to information technology.</h3>
    </Col>
  </Row>
);

export default CenterText;
