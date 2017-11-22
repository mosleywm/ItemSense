import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReaderStatus from '../ReaderStatus/ReaderStatus';
import './Reader.css';

class Reader extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.props.onSelect(e.target.value);
  }

  render() {
    const {reader, status} = this.props;
    return (
      <div className="reader-container">
        <div className="reader-select">
          <div>
            <label name="select">Select</label>
          </div>
          <input type="checkbox" onChange={this.handleSelect} name="select" value={reader.name} />
        </div>
        <div className="reader-content">
          <ReaderStatus status={status.status} message={status.message} />
          <div className="reader-info">
            <div>
              <span>Name: </span>
              <span>{reader.name}</span>
            </div>
            <div>
              <span>Type: </span>
              <span>{reader.type}</span>
            </div>
            <div>
              <span>Address: </span>
              <span>{reader.address}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Reader.propTypes = {
  reader: PropTypes.object.isRequired,
  status: PropTypes.object,
  onSelect: PropTypes.func.isRequired
};

export default Reader;
