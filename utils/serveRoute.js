const { readFreshCache, writeCache, readStaleCache } = require('../utils/cache-handler');

async function serveRoute(cacheKey, scraper, url, res) {
  try {
    
    // 1. Serve Fresh Cash
    const fresh = readFreshCache(cacheKey);
    if (fresh) return res.json({ source: 'cache', rankings: fresh.rankings,  lastUpdated: fresh.lastUpdated });

    // 2. If Stale, Scrape Data
    const scraped = await scraper(url); // scraper should return array
    // 2.a. Write Freshly Scraped Data to Cashe
    writeCache(cacheKey, scraped);

    return res.json({ source: 'fresh', rankings: scraped, lastUpdated: new Date().toISOString() });

  } catch (err) {

    console.error(`Error in serveRoute for ${cacheKey}:`, err);

    // 3) If error, Fallback to Stale Cache
    const stale = readStaleCache(cacheKey);
    if (stale) return res.json({ source: 'stale-cache', rankings: stale.rankings, lastUpdated: stale.lastUpdated });

    // 4) Otherwise, Serve a Hard Failure
    return res.status(500).json({ error: 'Failed to fetch rankings.' });
  }
}

module.exports = {
  serveRoute
}