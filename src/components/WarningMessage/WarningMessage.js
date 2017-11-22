import React from 'react';
import PropTypes from 'prop-types';
import './WarningMessage.css';

const WarningMessage = (props) => (
  <div className={props.type + '-block warning-container'}>{props.message}</div>
)

WarningMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default WarningMessage;
