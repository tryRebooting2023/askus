import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const GettingStartedButton = () => {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/tutorial'); // Navigate to the path for tutorial page
  };

  return (
    <Button variant="outline-light" onClick={navigateToLanding}>
      Getting Started
    </Button>
  );
};

export default GettingStartedButton;
