const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000';

module.exports = {
  getOperations: function() {
    return axios.get('/operations').then(res => {
      return res.data;
    });
  }
}
