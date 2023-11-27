import React from 'react';
import { Container } from 'react-bootstrap';
import ITSearch from '../components/Search';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid>
    <ITSearch />
  </Container>
);
export default Landing;
