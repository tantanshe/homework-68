import React from 'react';

const Spinner = () => (
  <div className="d-flex justify-content-center align-items-center spinner">
    <div className="spinner-border text-primary mt-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;