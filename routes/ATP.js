// routes/ATP.js
const router = require('express').Router();
const { readFreshCache, writeCache, readStaleCache } = require('../utils/cache-handler');
const paths = require('../utils/paths');

const { scrapeATPSingles } = require('../scrapers/atpSinglesScraper');
const { scrapeATPSinglesRace } = require('../scrapers/atpSinglesRaceScraper');
const { scrapeATPDoubles } = require('../scrapers/atpDoublesScraper');
const { scrapeATPDoublesRace } = require('../scrapers/atpDoublesRaceScraper');


async function serveRoute(cacheKey, scraper, res) {
  try {
    
    // 1. Serve Fresh Cash
    const fresh = readFreshCache(cacheKey);
    if (fresh) return res.json({ source: 'cache', data: fresh });

    // 2. If Stale, Scrape Data
    const scraped = await scraper(); // scraper should return array
    // 2.a. Write Freshly Scraped Data to Cashe
    writeCache(cacheKey, scraped);

    return res.json({ source: 'fresh', data: scraped });

  } catch (err) {

    console.error(`Error in serveRoute for ${cacheKey}:`, err);

    // 3) If error, Fallback to Stale Cache
    const stale = readStaleCache(cacheKey);
    if (stale) return res.json({ source: 'stale-cache', data: stale });

    // 4) Otherwise, Serve a Hard Failure
    return res.status(500).json({ error: 'Failed to fetch rankings.' });
  }
}

/* ROUTES */

// GET /atp/rankings/singles
router.get('/rankings/singles', async (req, res) => {
  await serveRoute(paths.ATP_SINGLES, scrapeATPSingles, res);
});

// GET /atp/rankings/singles-race
router.get('/rankings/singles-race', async (req, res) => {
  await serveRoute(paths.ATP_SINGLES_RACE, scrapeATPSinglesRace, res);
});

// GET /atp/rankings/doubles
router.get('/rankings/doubles', async (req, res) => {
  await serveRoute(paths.ATP_DOUBLES, scrapeATPDoubles, res);
});

// GET /atp/rankings/doubles-race
router.get('/rankings/doubles-race', async (req, res) => {
  await serveRoute(paths.ATP_DOUBLES_RACE, scrapeATPDoublesRace, res);
});

module.exports = router;
