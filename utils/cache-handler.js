const fs = require('fs');
const path = require('path');

// Is APP running in Production or Development Environment?
const IS_PRODUCTION = !!process.env.tennis - api;

// If APP is running in Production, create Cache in project-root/cache, otherwise store at /data/cache
const CACHE_DIR = IS_PRODUCTION
  ? '/data/cache'
  : path.join(__dirname, '../cache');

// In either environment, ensure that the cache directory exists. If not, create.
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

function getCachePath(filename) {
  return path.join(CACHE_DIR, filename);
}

function readFreshCache(filename) {
  const cachePath = getCachePath(filename);

  if (fs.existsSync(cachePath)) {
    const stats = fs.statSync(cachePath);
    const isFresh = (Date.now() - stats.mtimeMs) < ONE_WEEK;

    if (isFresh) {
      try {
        const raw = fs.readFileSync(cachePath, 'utf8');
        const json = JSON.parse(raw);

        // If data is empty, treat as stale
        if (!json.rankings || json.rankings.length === 0) {
          return null;
        }

        return json;
      } catch (err) {
        
        return null;
      }
    }
  }

  return null;
}

function writeCache(filename, data) {

  if (!Array.isArray(data)) {
    throw new Error(`writeCache expected array but received: ${typeof data}`);
  }

  const sorted = data
  .filter(item => item && typeof item.ranking !== "undefined")
  .sort((a, b) => Number(a.ranking) - Number(b.ranking));
  
  const cachePath = getCachePath(filename);
  fs.writeFileSync(cachePath, JSON.stringify({ rankings: sorted }, null, 2));
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