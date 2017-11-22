import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.props.handleChange(e.target.value);
  }

  render() {
    const operations = this.props.operations.map((operation, i) => {
      return (
        <option key="i" value={operation}>{operation}</option>
      );
    });

    return (
      <select onChange={this.handleOnChange}>
        <option value=""></option>
        {operations}
      </select>
    );
  }
}

Select.propTypes = {
  operations: PropTypes.array
};

export default Select;
