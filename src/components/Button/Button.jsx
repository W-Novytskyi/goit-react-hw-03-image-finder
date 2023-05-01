import React from 'react';
import { Button } from './Button.styled';
import PropTypes from 'prop-types';

const ButtonLoad = ({ onClick }) => {
  return <Button onClick={onClick}>Load more</Button>;
};

ButtonLoad.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonLoad;
