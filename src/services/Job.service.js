const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000';

module.exports = {
  startJob: function(operation, readers) {
    return axios.post('/jobs', {operation: operation, readers: readers}).then(res => {
      return res.data;
    });
  }
};
