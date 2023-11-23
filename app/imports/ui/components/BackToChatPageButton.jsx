import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const BackToLandingButton = () => {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/'); // Navigate to the root path
  };

  return (
    <Button variant="outline-success" onClick={navigateToLanding}>
      Back to Chat Page
    </Button>
  );
};

export default BackToLandingButton;
