const router = require('express').Router();
const { WTA_SCRAPE_URLS } = require("../utils/scrapeURLs");
const cachePaths = require('../utils/cachePaths');
const { serveRoute } = require('../utils/serveRoute');

const { scrapeWTASingles } = require('../scrapers/wtaSinglesScraper');
const { scrapeWTASinglesRace } = require('../scrapers/wtaSinglesRaceScraper');
const { scrapeWTADoubles } = require('../scrapers/wtaDoublesScraper');
const { scrapeWTADoublesRace } = require('../scrapers/wtaDoublesRaceScraper');

// WTA Singles Rankings API Response
router.get('/rankings/singles', async (req, res) => {
  await serveRoute(cachePaths.WTA_SINGLES, scrapeWTASingles, WTA_SCRAPE_URLS.singles, res);
})

// WTA Singles Race Rankings API Response

router.get('/rankings/singles-race', async (req, res) => {
  await serveRoute(cachePaths.WTA_SINGLES_RACE, scrapeWTASinglesRace, WTA_SCRAPE_URLS.singlesRace, res);
})

router.get('/rankings/doubles', async (req, res) => {
  await serveRoute(cachePaths.WTA_DOUBLES, scrapeWTADoubles, WTA_SCRAPE_URLS.doubles, res);
})

router.get('/rankings/doubles-race', async (req, res) => {
  await serveRoute(cachePaths.WTA_DOUBLES_RACE, scrapeWTADoublesRace, WTA_SCRAPE_URLS.doublesRace, res);
})

// Export API routes
module.exports = router;