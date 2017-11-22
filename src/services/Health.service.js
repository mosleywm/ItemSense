const axios = require('axios');
axios.default.baseURL = 'http://localhost:3000';

module.exports = {
  getHealth: () => {
    return axios.get('/health').then(res => {
      return res.data;
    });
  }
}
