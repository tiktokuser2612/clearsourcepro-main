import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const LoadingIndicator = ({ isLoading, fullScreen }) => (
  <div
    className={'loading-indicator' + (fullScreen ? ' fullscreen' : '')}
    style={{
      display: isLoading ? 'flex' : 'none',
    }}
  >
    <i className="fas fa-circle-notch fa-spin fa-3x" />
  </div>
);

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fullScreen: PropTypes.any,
};

export default LoadingIndicator;
