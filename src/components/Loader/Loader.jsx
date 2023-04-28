import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Container } from './Loader.styled';

const Loader = () => {
  return (
    <Container className="spinner">
      <ThreeDots type="Oval" color="#c20505" height={90} width={90} />
    </Container>
  );
};

export default Loader;
