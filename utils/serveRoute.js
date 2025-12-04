const { readFreshCache, writeCache, readStaleCache } = require('../utils/cache-handler');

async function serveRoute(cacheKey, scraper, url, res) {
  try {
    
    // 1. Serve Fresh Cache
    const fresh = readFreshCache(cacheKey);

    if (fresh) {

      // 1.a. Check if Fresh Cache contains empty rankings array
      const rankings = fresh.rankings

      // 1.b. If rankings array is empty, re-scrape
      if (Array.isArray(rankings) && rankings.length === 0) {
        console.warn(`[${cacheKey}] Fresh cache contains an empty rankings array — re-scraping.`)
        const scraped = await scraper(url)
        writeCache(cacheKey, scraped.rankings);
        return res.json({
          source: "cache",
          rankings: scraped,
          lastUpdated: new Date().toISOString()
        });
      }

      // 1.c. If not, serve JSON response
      return res.json({ source: 'cache', rankings: fresh.rankings, lastUpdated: fresh.lastUpdated })
    }
      

    // 2. If Stale, Scrape Data
    console.log('Stale Data -- Rescraping')
    const scraped = await scraper(url);

    // 2.a. Write Freshly Scraped Data to Cache
    writeCache(cacheKey, scraped);

    // 2.b. After writing to cache, Serve JSON response
    return res.json({
      source: "fresh",
      rankings: scraped,
      lastUpdated: new Date().toISOString()
    });

  } catch (err) {

    console.error(`Error in serveRoute for ${cacheKey}:`, err);

    // 3) If error, Fallback to Stale Cache
    const stale = readStaleCache(cacheKey);
    if (stale)
      return res.json({
        source: 'stale-cache',
        rankings: stale.rankings,
        lastUpdated: stale.lastUpdated
      });

      // 4) Return empty rankings.
      console.warn(`[${cacheKey}] No cache available and scraping failed — returning empty rankings.`);
      return res.json({ 
        source: 'error-fallback',
        rankings: [], 
        lastUpdated: new Date().toISOString(),
        message: 'Rankings temporarily unavailable'
      });
  }
}

module.exports = {
  serveRoute
}