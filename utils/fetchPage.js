const axios = require("axios");

module.exports = async function fetchPage(url) {
  return axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'
    },
    timeout: 2000
  });
};
