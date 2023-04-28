import React from 'react';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ children }) => {
  return <Gallery>{children}</Gallery>;
};

export default ImageGallery;
