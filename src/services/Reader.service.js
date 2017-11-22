const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000';

module.exports = {
  getReaders: function() {
    return axios.get('readers').then(res => {
      return res.data;
    });
  }
};
