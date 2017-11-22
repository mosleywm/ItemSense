import React, { Component } from 'react';
import './App.css';
import Reader from './components/Reader/Reader';
import Select from './components/Select/Select';
import WarningMessage from './components/WarningMessage/WarningMessage';
import ReaderService from './services/Reader.service.js';
import HealthService from './services/Health.service.js';
import OperationService from './services/Operation.service.js';
import JobService from './services/Job.service.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readers: [],
      health: [],
      operations: [],
      selectedReaders: [],
      selectedOperation: '',
      warning: {}
    };
    this.runOperation = this.runOperation.bind(this);
    this.generateTemplate = this.generateTemplate.bind(this);
    this.toggleReader = this.toggleReader.bind(this);
    this.getWarning = this.getWarning.bind(this);
    this.selectOperation = this.selectOperation.bind(this);
  }

  runOperation() {
    if(this.state.selectedReaders.length > 0 && this.state.selectedOperation) {
      JobService.startJob(this.state.selectedOperation, this.state.selectedReaders).then(res => {
        alert('Job Started!');
      });
    } else {
      if(this.state.selectedReaders < 1) {
        this.setState({warning: {
          message: 'Please select a reader',
          type: 'error'
        }});
      }
      if(!this.state.selectedOperation) {
        this.setState({warning: {
          message: 'Please select an operation to run.',
          type: 'error'
        }});
      }
    }
  }

  generateTemplate() {
    const {health} = this.state;
    return this.state.readers.map((reader, i) => {
      const status = health.find(status => {
        return status.reader === reader.name;
      }) || {};
      return (
        <Reader
          key={i}
          reader={reader}
          status={status}
          onSelect={this.toggleReader} />
      );
    });
  }

  toggleReader(reader) {
    this.setState(prevState => {
      let readers = prevState.selectedReaders;
      if(readers.includes(reader)) {
        readers.splice(readers.indexOf(reader), 1);
      } else {
        readers.push(reader);
      }

      const warning = this.getWarning(readers, prevState.health);

      return {
        warning: warning,
        selectReader: readers
      };
    });
  }

  getWarning(readers, health) {
    let warning = {};
    let readerWarnings = health.filter(status => {
      return readers.includes(status.reader);
    });
    if(readerWarnings.length > 0) {
      if(readerWarnings.find(warning => (warning.status === 'ERROR'))) {
        warning = {
          type: 'error',
          message: 'A reader is in an error state. Please deselect reader before running a job.'
        }
      } else {
        warning = {
          type: 'warning',
          message: 'Caution: A reader is in a warning state.'
        }
      }
    }
    return warning;
  }

  selectOperation(operation) {
    let warning = this.getWarning(this.state.selectedReaders, this.state.health);
    this.setState({
      warning: warning,
      selectedOperation: operation
    });
  }

  componentDidMount() {
    ReaderService.getReaders().then(res => {
      this.setState({readers: res});
    });

    HealthService.getHealth().then(res => {
      this.setState({health: res});
    });

    OperationService.getOperations().then(res => {
      this.setState({operations: res});
    })
  }

  render() {
    const readers = this.generateTemplate();

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ItemSense</h1>
        </header>
        <main>
          <div className="section">
            <div className="section-small">
              <label name="operation">Select Operation: </label>
              <Select operations={this.state.operations} handleChange={this.selectOperation} />
              <button
                className="btn"
                type="button"
                disabled={this.state.warning.type === 'error'}
                onClick={this.runOperation}>Run Job</button>
            </div>
            {this.state.warning.message &&
              <WarningMessage message={this.state.warning.message} type={this.state.warning.type} />
            }
          </div>
          <div>
            {readers}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
