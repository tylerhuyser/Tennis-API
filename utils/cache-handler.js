const fs = require('fs');
const path = require('path');

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

function getCachePath(filename) {
  return path.join(__dirname, '../cache', filename);
}

function readFreshCache(filename) {
  const cachePath = getCachePath(filename);

  if (fs.existsSync(cachePath)) {
    const stats = fs.statSync(cachePath);
    const isFresh = (Date.now() - stats.mtimeMs) < ONE_WEEK;

    if (isFresh) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }
  }

  return null;
}

function writeCache(filename, data) {
  const cachePath = getCachePath(filename);
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
}

function readStaleCache(filename) {
  const cachePath = getCachePath(filename);
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  }
  return null;
}

module.exports = {
  getCachePath,
  readFreshCache,
  writeCache,
  readStaleCache
};