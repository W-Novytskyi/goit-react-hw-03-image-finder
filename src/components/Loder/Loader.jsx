import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="spinner">
      <ThreeDots type="Oval" color="#3f51b5" height={80} width={80} />
    </div>
  );
};

export default Loader;
