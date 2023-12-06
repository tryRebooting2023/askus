import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const LoadingDots = () => (
  <div className="spinner-container">
    <Row className="justify-content-md-center">
      <Spinner animation="grow" variant="primary" className="custom-spinner" />
      <Spinner animation="grow" variant="primary" className="custom-spinner" />
      <Spinner animation="grow" variant="primary" className="custom-spinner" />
    </Row>
  </div>
);

export default LoadingDots;
