import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const LoadingDots = () => (
  <div className="spinner-container">
    <Row className="justify-content-md-center">
      <Spinner animation="grow" size="sm" variant="primary" className="custom-spinner px-1" />
      <Spinner animation="grow" size="sm" variant="primary" className="custom-spinner px-1" />
      <Spinner animation="grow" size="sm" variant="primary" className="custom-spinner px-1" />
    </Row>
  </div>
);

export default LoadingDots;
