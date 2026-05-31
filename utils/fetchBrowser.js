const cloudscraper = require('cloudscraper');

module.exports = async function fetchPageBrowser(url) {
  const html = await cloudscraper.get(url);
  return { data: html };
};
