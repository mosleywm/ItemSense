import React from 'react';
import PropTypes from 'prop-types';
import './ReaderStatus.css';

const ReaderStatus = props => {
  let classes = 'status-container ';
  classes += props.status ? props.status.toLowerCase() : 'ok';

  return (
    <div className={classes}>
      <span>Status: </span>
      <span>{
        props.status ?
        props.status + ' - ' + props.message : 'OK'
      }</span>
    </div>
  );
}

ReaderStatus.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string
};

export default ReaderStatus;
